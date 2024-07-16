import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const Map = ({ locations, placesCoords = [] }) => {
  console.log(locations);
  console.log(placesCoords);
  
  return (
    <div className="map-container">
      <MapContainer center={[40.4168, -3.7038]} zoom={12} id="map" style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.latitude, location.longitude]}>
            <Popup>Current Location</Popup>
          </Marker>
        ))}
        {placesCoords.map((place, index) => (
          <Marker key={index} position={[place.lat, place.lon]}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
        {locations.length > 1 && (
          <Polyline positions={locations.map(loc => [loc.latitude, loc.longitude])} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;