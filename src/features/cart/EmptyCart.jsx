import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="px-5 py-8">
      <Link to="/menu">&larr; Back to menu</Link>
      <p className="mt-5 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}
