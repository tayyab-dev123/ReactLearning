import { formatCurrency } from '../../utills/helpers';
import { DeleteItem } from './DeleteItem';
import { UpdateItemQuantity } from './UpdateItemQuantity';

export default function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="justify-between py-3 font-medium sm:mb-0 sm:flex">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
