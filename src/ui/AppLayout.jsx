import { Outlet, useNavigation } from 'react-router-dom';
import { Cart } from '../features/cart/Cart';
import { CartOverview } from '../features/cart/CartOverview';
import Loader from '../ui/Loader';
import Header from '../ui/Header';

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-xl sm:max-w-full">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
