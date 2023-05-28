import { createUpdateOrderDto, Order } from './dto/order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>
  ) {}
  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderRepo.find();
      return orders;
    } catch (error) {
      throw new Error(`Error while trying to get orders: ${JSON.stringify(error)}`);
    }

  }

  async getOrderById(orderId: number): Promise<Order> {
    try {
      return await this.orderRepo.findOne({
        where: {
          id: orderId
        }
      })
    } catch (error) {
      throw new Error(`Error while trying to get order: ${JSON.stringify(error)}`);
    }
  }

  async createOrder(order: createUpdateOrderDto): Promise<Order> {
    try {
      const createdOrder = this.orderRepo.create(order);
      return await this.orderRepo.save(createdOrder);
    } catch (error) {
      throw new Error(`Error while trying to create orders: ${JSON.stringify(error)}`);
    }
  }

  async updateOrder(
    orderId: number,
    order: createUpdateOrderDto,
  ): Promise<Order> {
    try {
      const ord = await this.orderRepo.findOne({
        where: {
          id: orderId
        }
      })
      const createdOrder = this.orderRepo.create({ ...ord, ...order });
      return await this.orderRepo.save(createdOrder);
    } catch (error) {
      throw new Error(`Error while trying to update orders: ${JSON.stringify(error)}`);
    }
  }

  async deleteOrder(orderId: number): Promise<void> {
    try {
      await this.orderRepo.delete(orderId);
      return
    } catch (error) {
      throw new Error(`Error while trying to update orders: ${JSON.stringify(error)}`);
    }
  }
}
