import { useCities } from "../contexts/CitiesContext";
import { CityItem } from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import { Spinner } from "./Spinner";

export const CityList = () => {
  const { isLoading, cities } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <Message message="Please add your city" />;
  }
  return (
    <div className={styles.cityList}>
      <ul>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    </div>
  );
};
