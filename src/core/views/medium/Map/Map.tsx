import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([52.0705, 4.3007], 13); // Set view to The Hague
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([52.0705, 4.3007]) // Marker at The Hague
        .addTo(map)
        .bindPopup('My farm')
        .openPopup();

      // Force Leaflet to resize
      setTimeout(() => {
        map.invalidateSize();
      }, 0);
    }
  }, []);

  return (
    <section className={styles.map}>
      <h2 className={styles.map__h2}>Farm locations</h2>
      <div
        ref={mapRef}
        className={styles.mapContainer}
        style={{ width: '100%', height: '90%' }}
      ></div>
    </section>
  );
};

export default Map;
