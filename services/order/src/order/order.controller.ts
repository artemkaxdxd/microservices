import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { createUpdateOrderDto, Order } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string): Promise<Order> {
    return await this.orderService.getOrderById(+orderId);
  }

  @Post()
  async createOrder(@Body() order: createUpdateOrderDto): Promise<Order> {
    return await this.orderService.createOrder(order);
  }

  @Put()
  async updateOrder(
    @Param('id') orderId: string,
    @Body() order: createUpdateOrderDto,
  ): Promise<Order> {
    return await this.orderService.updateOrder(+orderId, order);
  }

  @Delete()
  async deleteOrder(@Param('id') orderId: string): Promise<void> {
    return await this.orderService.deleteOrder(+orderId);
  }
}
