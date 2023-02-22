import { createUpdateOrderDto, Order } from './dto/order.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    return [
      {
        id: 1,
        title: 'Order BMW',
        description: 'Ordered BMW to travel through the Europe',
        status: true,
        createdAt: new Date(),
        returnDate: new Date(),
        customerId: 1,
        carId: 1,
      },
      {
        id: 2,
        title: 'Order BMW',
        description: 'Ordered BMW to travel through the Europe',
        status: true,
        createdAt: new Date(),
        returnDate: new Date(),
        customerId: 1,
        carId: 1,
      },
    ];
  }

  async getOrderById(orderId: number): Promise<Order> {
    return {
      id: orderId,
      title: 'Order BMW',
      description: 'Ordered BMW to travel through the Europe',
      status: true,
      createdAt: new Date(),
      returnDate: new Date(),
      customerId: 1,
      carId: 1,
    };
  }

  async createOrder(order: createUpdateOrderDto): Promise<Order> {
    return {
      id: 1,
      ...order,
    };
  }

  async updateOrder(
    orderId: number,
    order: createUpdateOrderDto,
  ): Promise<Order> {
    return {
      id: orderId,
      ...order,
    };
  }

  async deleteOrder(orderId: number): Promise<void> {
    return;
  }
}
