import { useDispatch } from 'react-redux';
import { Button } from '../../ui/Button';
import { deleteCart } from './cartSlice'; // Import the correct action creator

export const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();
  console.log('Delete item', pizzaId);

  const handleDelete = () => {
    dispatch(deleteCart(pizzaId)); // Dispatch the correct action
  };

  return (
    <Button type="small" onClick={handleDelete}>
      Delete
    </Button>
  );
};
