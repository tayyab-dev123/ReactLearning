import { Link } from 'react-router-dom';
import { LinkButton } from '../../ui/LinkButton';
import { Button } from '../../ui/Button';
import CartItem from './CartItem';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export const Cart = () => {
  const cart = fakeCart;

  return (
    <div className="p-4">
      <LinkButton
        to="/menu"
        className="text-sm text-blue-400 hover:text-blue-700 hover:underline"
      >
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-8 text-xl font-semibold">Your cart, %NAME%</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-y">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-4 space-x-3">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="Secondary">Clear cart</Button>
      </div>
    </div>
  );
};
