// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { BackButton } from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";
import { Message } from "./Message";
import { Spinner } from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isGeoLocationError, setIsGeoLocationError] = useState("");
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const { lat, lng } = useURLPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;
    async function getCountry() {
      try {
        if (!lat || !lng) return;
        setIsLoadingUrl(true);
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryName) {
          throw new Error("Country not found click other location");
        }

        setCountry(data.countryName || "");
        setCityName(data.city || data.locality || "");
        setIsLoadingUrl(false);
        setEmoji(convertToEmoji(data?.countryCode));
        setIsGeoLocationError("");
      } catch (error) {
        setIsGeoLocationError(error.message);
      } finally {
        setIsLoadingUrl(false);
      }
    }
    getCountry();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  };

  if (isLoadingUrl) {
    return <Spinner />;
  }

  if (!lat || !lng) {
    return (
      <Message message="Please select a location by cliking on the Map"></Message>
    );
  }

  if (isGeoLocationError) {
    return <Message message={isGeoLocationError}></Message>;
  }
  return (
    <form className={`${styles.form} ${isLoading ? "form.loading" : ""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          format="dd-MM-yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={handleSubmit} type="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
