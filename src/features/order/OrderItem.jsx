import { formatCurrency } from '../../utills/helpers';

export default function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-5">
      <div className="flex justify-between">
        <p className="">
          <span className="text-base font-bold">{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}
