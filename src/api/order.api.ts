import { request } from 'http';
import { Order, OrderDetailItem, OrderSheet } from '../models/order.model';
import { httpClient, requestHandler } from '@/api/http';

// export const order = async (orderData: OrderSheet) => {
//   const response = await httpClient.post('/orders', orderData);
//   return response.data;
// };

export const order = async (orderData: OrderSheet) => {
  return await requestHandler<OrderSheet>('post', '/orders', orderData);
};

export const fetchOrders = async () => {
  return await requestHandler('get', '/orders');
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler<OrderDetailItem[]>('get', `/orders/${orderId}`);
};
