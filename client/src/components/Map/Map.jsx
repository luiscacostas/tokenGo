import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const Map = ({ locations, placesCoords = [] }) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (placesCoords.length > 0) {
      setMapReady(true);
    }
  }, [placesCoords]);

  if (!mapReady) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="map-container">
      <MapContainer center={[40.4168, -3.7038]} zoom={12} id="map" style={{ height: "50vh", width: "100%" }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations && locations.map((location, index) => (
          <Marker key={index} position={[location.latitude, location.longitude]}>
            <Popup>Current Location</Popup>
          </Marker>
        ))}
        {placesCoords && placesCoords.map((place, index) => (
          <Marker key={index} position={[place.lat, place.lon]}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
        {locations && locations.length > 1 && (
          <Polyline positions={locations.map(loc => [loc.latitude, loc.longitude])} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
