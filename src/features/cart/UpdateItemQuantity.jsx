import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../ui/Button';
import {
  decreaseItemQuantity,
  getCurrentQuanityById,
  increaseItemQuantity,
} from './cartSlice';

export const UpdateItemQuantity = ({ pizzaId }) => {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuanityById(pizzaId));

  return (
    <div className="flex gap-4">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};
