import { Button } from '../../ui/Button';
import { formatCurrency } from '../../utills/helpers';

export default function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="justify-between py-3 font-medium sm:mb-0 sm:flex">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <Button type="primary">Delete</Button>
      </div>
    </li>
  );
}
