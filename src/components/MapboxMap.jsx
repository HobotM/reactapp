import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWF0ZXVzemhvYm90IiwiYSI6ImNsZzBxaDJrdjByZzEzZm10Y3FndjVkZXYifQ.QoA77g03GRzIvMPw8xO7PA';

const MapboxMap = ({ latitude, longitude }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 14,
    });

    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => map.remove();
  }, [latitude, longitude]);

  return <div ref={mapContainer} style={{ width: '100%', height: '300px' }} />;
};

export default MapboxMap;
