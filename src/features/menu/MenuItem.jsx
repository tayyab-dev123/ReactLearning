import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../ui/Button';
import { formatCurrency } from '../../utills/helpers';
import { addCart, getCurrentQuanityById } from '../cart/cartSlice';
import { DeleteItem } from '../cart/DeleteItem';
import { UpdateItemQuantity } from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuanityById(id));

  const isInCart = currentQuantity > 0;

  // if (currentQuantity > 0) {
  //   console.log('currentQuantity', currentQuantity);
  // }

  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItems = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addCart(newItems));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`w-24 rounded-full object-cover ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-extrabold"> {name}</p>
        <p className="capitalize italic">{ingredients.join(', ')}</p>
        <div className="flex items-center justify-between">
          <div className="mt-auto">
            {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          </div>

          {isInCart && (
            <div className="flex gap-4">
              <UpdateItemQuantity pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
