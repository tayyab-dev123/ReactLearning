import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import { Spinner } from "./Spinner";

export const CountryList = () => {
  const { isLoading, cities } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <Message message="Please add your city" />;
  }

  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country))
      return [...acc, { country: city.country, emoji: city.emoji }];
    else return acc;
  }, []);

  return (
    <div className={styles.CountryList}>
      <ul style={{ display: "flex" }}>
        {countries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
      </ul>
    </div>
  );
};
