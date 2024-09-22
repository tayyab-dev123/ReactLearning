import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartTotal, getCartTotalPrice } from './cartSlice';

export const CartOverview = () => {
  const totalPizzaCount = useSelector(getCartTotal);

  const totalPrice = useSelector(getCartTotalPrice);

  if (!totalPizzaCount) return null;

  return (
    <div className="h-12 flex justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-100 sm:px-6 md:text-base">
      <p className="space-x-5 text-stone-300 sm:space-x-6">
        <span>{totalPizzaCount} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open Cart &rarr;</Link>
    </div>
  );
};
