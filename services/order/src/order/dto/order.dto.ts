export interface abstractOrderDto {
  id: number;
}

export interface createUpdateOrderDto {
  title?: string;
  description?: string;
  status?: boolean;
  createdAt?: Date;
  returnDate?: Date;
  customerId?: number;
  carId?: number;
}

export interface Order extends abstractOrderDto, createUpdateOrderDto {}
