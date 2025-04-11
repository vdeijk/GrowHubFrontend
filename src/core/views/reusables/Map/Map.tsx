import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

interface MapProps {
  enableScroll?: boolean;
  markers?: { lat: number; lng: number; popupContent: string }[];
}

const Map: React.FC<MapProps> = ({ enableScroll = false, markers = [] }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const initMap = () => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        scrollWheelZoom: enableScroll,
      });
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      addMarkers(map);
      fitMapToMarkers(map);
    }
  };

  const addMarkers = (map: L.Map) => {
    markers.forEach((marker) => {
      L.marker([marker.lat, marker.lng])
        .addTo(map)
        .bindPopup(L.popup().setContent(marker.popupContent));
    });
  };

  const fitMapToMarkers = (map: L.Map) => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(
        markers.map((marker) => [marker.lat, marker.lng] as [number, number]),
      );
      map.fitBounds(bounds, { padding: [20, 20] });
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

/*
      setTimeout(() => {
        map.invalidateSize();
      }, 0);*/
