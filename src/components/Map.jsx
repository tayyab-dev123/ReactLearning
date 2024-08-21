import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { Button } from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";

export const Map = () => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { lat, lng } = useURLPosition();
  const {
    isLoading: isLoadingPosition,
    position: positonLocation,
    getPosition,
  } = useGeolocation();
  const { cities } = useCities();

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (positonLocation) {
      setMapPosition([positonLocation.lat, positonLocation.lng]);
    }
  }, [positonLocation]);

  return (
    <div className={styles.mapContainer}>
      {
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "My Position"}
        </Button>
      }
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}
        <CenterPosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

export const CenterPosition = ({ position }) => {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
};

export const DetectClick = () => {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
      console.log(lat, lng);
    },
  });
  return null;
};
