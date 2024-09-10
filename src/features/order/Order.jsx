// Test ID: IIDSAT

import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utills/helpers';
import OrderItem from './OrderItem';

export const Order = () => {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex flex-wrap justify-between">
        <h2 className="font-bold">Order #{id} Status</h2>

        <div className="space-x-4">
          {priority && (
            <span className="rounded-full bg-red-600 p-2 text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 p-2 text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between bg-stone-200 p-6">
        <p className="font-bold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-y">
        {cart.map((item) => (
          <OrderItem item={item} key={id} />
        ))}
      </ul>

      <div className="bg-stone-200 px-6 py-5">
        <p className="font-semibold">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-semibold">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-xl font-extrabold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
};

export async function Loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}
