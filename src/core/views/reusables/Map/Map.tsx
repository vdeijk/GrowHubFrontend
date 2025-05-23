import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import fieldsStore from '../../../stores/derived/FieldsStore/FieldsStore';
import { observer } from 'mobx-react-lite';
import EventBus from '../../../services/EventBusService/EventBusService';

interface MapProps {
  enableScroll?: boolean;
  markers?: { lat: number; lng: number; popupContent: string }[];
}

const Map: React.FC<MapProps> = observer(
  ({ enableScroll = false, markers = [] }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
      const DefaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;
    }, []);

    useEffect(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        const map = L.map(mapRef.current, {
          scrollWheelZoom: enableScroll,
          minZoom: 2, // Allow zooming out further
          maxZoom: 18, // Set a reasonable maximum zoom level
        });
        map.setView([52.0705, 4.3007], 13);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
      }
    }, [enableScroll]);

    useEffect(() => {
      if (mapInstanceRef.current) {
        const map = mapInstanceRef.current;

        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        markers.forEach((marker) => {
          L.marker([marker.lat, marker.lng])
            .addTo(map)
            .bindTooltip(marker.popupContent, {
              permanent: true,
              direction: 'top',
              className: styles.customTooltip,
            });
        });

        if (markers.length > 0) {
          const bounds = L.latLngBounds(
            markers.map(
              (marker) => [marker.lat, marker.lng] as [number, number],
            ),
          );
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      }
    }, [markers]);

    useEffect(() => {
      const handleCenterMap = () => {
        if (mapInstanceRef.current && fieldsStore.locations.length > 0) {
          const bounds = L.latLngBounds(
            fieldsStore.locations
              .map((location) =>
                location.latitude !== undefined &&
                location.longitude !== undefined
                  ? L.latLng(location.latitude, location.longitude)
                  : null,
              )
              .filter((latLng) => latLng !== null) as L.LatLng[],
          );

          setTimeout(() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.invalidateSize();
              mapInstanceRef.current.fitBounds(bounds);
            }
          }, 100);
        } else {
          console.warn('No locations available to center the map.');
        }
      };

      EventBus.addEventListener('centerMap', handleCenterMap);
      EventBus.addEventListener('locations:updated', handleCenterMap);

      return () => {
        EventBus.removeEventListener('centerMap', handleCenterMap);
        EventBus.removeEventListener('locations:updated', handleCenterMap);
      };
    }, [fieldsStore.locations]);

    return (
      <section className={styles.map}>
        <div ref={mapRef} className={styles.mapContainer}></div>
      </section>
    );
  },
);

export default Map;
