import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order.entity';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders for the current user' })
  @ApiResponse({ status: 200, description: 'Return all orders.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll(@Request() req) {
    return this.ordersService.findAll(req.user.id);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get all orders (admin only)' })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiResponse({ status: 200, description: 'Return all orders.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllAdmin(@Query('status') status?: OrderStatus) {
    if (status) {
      return this.ordersService.getOrdersByStatus(status);
    }
    // Return all orders for admin
    return this.ordersService.findAll(''); // Empty userId for admin
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific order' })
  @ApiResponse({ status: 200, description: 'Return the order.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async findOne(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(req.user.id, id);
  }

  @Get(':id/process-status')
  @ApiOperation({ summary: 'Get order process status from Camunda' })
  @ApiResponse({ status: 200, description: 'Return the process status.' })
  @ApiResponse({ status: 404, description: 'Order or process not found.' })
  async getProcessStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getProcessStatus(id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update order status (admin only)' })
  @ApiResponse({ status: 200, description: 'Order status updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: OrderStatus
  ) {
    // For admin, we don't need userId validation
    return this.ordersService.updateStatus('', id, status);
  }

  @Patch(':id/tracking')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Add tracking number to order (admin only)' })
  @ApiResponse({ status: 200, description: 'Tracking number added.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async addTrackingNumber(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('trackingNumber') trackingNumber: string
  ) {
    return this.ordersService.addTrackingNumber(id, trackingNumber);
  }
}