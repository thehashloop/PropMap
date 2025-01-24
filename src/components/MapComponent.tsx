'use client';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const MapComponent = () => {
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [locationLoaded, setLocationLoaded] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationLoaded(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationLoaded(true); // Fallback to default
        }
      );
    } else {
      setLocationLoaded(true); // Geolocation not supported
    }
  }, []);

  const mapOptions = {
    center: center,
    zoom: 12,
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  return isLoaded && locationLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100vw',
        height: '100vh',
      }}
      options={mapOptions}
    />
  ) : <div>Loading map...</div>;
};

export default MapComponent; 