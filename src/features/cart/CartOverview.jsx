import { Link } from 'react-router-dom';

export const CartOverview = () => {
  return (
    <div className="flex h-12 justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-100 sm:px-6 md:text-base">
      <p className="space-x-5 text-stone-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open Cart &rarr;</Link>
    </div>
  );
};
