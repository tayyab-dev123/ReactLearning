import styles from "./CountryItem.module.css";

export function CountryItem({ country }) {
  return (
    <li style={{ margin: "5px" }} className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
