import { useFetcher } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

export const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
};

export async function action({ request, params }) {
  // Correctly destructure request and params
  console.log('Update');
  const data = { priority: true };
  console.log(params); // Should log the params object
  await updateOrder(params?.orderId, data);
  return null;
}
