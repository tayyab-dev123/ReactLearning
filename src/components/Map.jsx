import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import buttonStyles from "./Button.module.css";

export const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h2>Latitude: {lat}</h2>
      <h2>Longitude: {lng}</h2>
      <button
        className={`${buttonStyles.btn} ${buttonStyles.primary}`}
        onClick={() => setSearchParam({ lat: 50, lng: 50 })}
      >
        Reset
      </button>
    </div>
  );
};
