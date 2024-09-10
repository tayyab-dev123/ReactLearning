import { Link } from 'react-router-dom';
import { SearchOrder } from '../features/order/SearchOrder';
import { Username } from '../features/user/Username';

export default function Header() {
  return (
    <header className="flex h-12 items-center justify-between rounded-md border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase tracking-widest sm:p-6">
      <Link to="/">Fast React Pizza</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
