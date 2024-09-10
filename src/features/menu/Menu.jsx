import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

export const Menu = () => {
  const menu = useLoaderData();
  return (
    <>
      <ul className="divide-y divide-slate-200">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  );
};

export async function Loader() {
  const menu = await getMenu();
  return menu;
}
