import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [];

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const total = createOrderDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      items: createOrderDto.items,
      total,
      status: 'pending',
      shippingAddress: createOrderDto.shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.orders.filter(order => order.userId === userId);
  }

  async findOne(userId: string, orderId: string): Promise<Order> {
    const order = this.orders.find(
      order => order.userId === userId && order.id === orderId
    );
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    
    return order;
  }

  async updateStatus(
    userId: string,
    orderId: string,
    status: Order['status']
  ): Promise<Order> {
    const order = await this.findOne(userId, orderId);
    order.status = status;
    order.updatedAt = new Date();
    return order;
  }
}