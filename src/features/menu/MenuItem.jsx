import { Button } from '../../ui/Button';
import { formatCurrency } from '../../utills/helpers';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4 py-2">
      <img
        // className={` ${soldOut ? 'opacity-70 grayscale' : ''}`}
        className="w-24 rounded-full object-cover"
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
          <Button type="small">Add to Cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
