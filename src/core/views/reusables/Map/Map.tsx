import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

interface MapProps {
  enableScroll?: boolean;
}

const Map: React.FC<MapProps> = ({ enableScroll = false }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const initMap = () => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([52.0705, 4.3007], 13);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([52.0705, 4.3007])
        .addTo(map)
        .bindPopup(
          L.popup().setContent('<div class="custom-popup">My farm</div>'),
        )
        .openPopup();

      setTimeout(() => {
        map.invalidateSize();
      }, 0);
    }
  };

  useEffect(() => {
    initMap();

    if (mapInstanceRef.current) {
      mapInstanceRef.current.scrollWheelZoom[
        enableScroll ? 'enable' : 'disable'
      ]();
    }
  }, [enableScroll]);

  return (
    <section className={styles.map}>
      <div ref={mapRef} className={styles.mapContainer}></div>
    </section>
  );
};

export default Map;
