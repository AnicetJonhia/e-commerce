import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    // Validate products and calculate total
    let total = 0;
    const orderItems: Partial<OrderItem>[] = [];

    for (const item of createOrderDto.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId, isActive: true },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        );
      }

      const itemPrice = product.discountedPrice;
      total += itemPrice * item.quantity;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    // Create order
    const order = this.orderRepository.create({
      userId,
      total,
      shippingAddress: createOrderDto.shippingAddress,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    for (const itemData of orderItems) {
      const orderItem = this.orderItemRepository.create({
        ...itemData,
        orderId: savedOrder.id,
      });
      await this.orderItemRepository.save(orderItem);
    }

    // Update product stock
    for (const item of createOrderDto.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });
      if (product) {
        product.stock -= item.quantity;
        await this.productRepository.save(product);
      }
    }

    // Start Camunda process for order processing
    try {
      const orderWithItems = await this.findOne(userId, savedOrder.id);
      const processInstanceId = await this.camundaService.startOrderProcess({
        id: savedOrder.id,
        userId: userId,
        total: total,
        items: orderItems,
        shippingAddress: createOrderDto.shippingAddress,
        userEmail: 'user@example.com', // This should come from user data
        paymentData: {
          amount: total,
          currency: 'USD',
          // Add payment method details here
        }
      });

      // Update order with process instance ID
      savedOrder.processInstanceId = processInstanceId;
      await this.orderRepository.save(savedOrder);

    } catch (error) {
      console.error('Failed to start Camunda process:', error);
      // Continue with order creation even if Camunda fails
    }

    return this.findOne(userId, savedOrder.id);
  }

  async findAll(userId: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(userId: string, orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, userId },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }

  async updateStatus(
    userId: string,
    orderId: string,
    status: OrderStatus,
  ): Promise<Order> {
    const order = await this.findOne(userId, orderId);
    order.status = status;
    await this.orderRepository.save(order);
    return order;
  }

  async addTrackingNumber(
    orderId: string,
    trackingNumber: string,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.trackingNumber = trackingNumber;
    order.status = OrderStatus.SHIPPED;
    return await this.orderRepository.save(order);
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { status },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async getProcessStatus(orderId: string): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order || !order.processInstanceId) {
      throw new NotFoundException('Order or process instance not found');
    }

    return await this.camundaService.getProcessStatus(order.processInstanceId);
  }
}