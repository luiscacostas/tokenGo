import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Map from '../../components/Map';
import Places from '../../components/Places';

const socket = io('https://tokengo-production.up.railway.app/'); // Asegúrate de usar la URL correcta

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [placesCoords, setPlacesCoords] = useState([]);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    let watchId;
    if (tracking && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        setLocations((prevLocations) => [...prevLocations, newLocation]);
        socket.emit('updateLocation', newLocation);
      });

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [tracking]);

  const startTracking = () => {
    setTracking(true);
  };

  return (
    <div>
      <button onClick={startTracking}>Iniciar Localizacion</button>
      <Map locations={locations} placesCoords={placesCoords} />
      <Places setPlacesCoords={setPlacesCoords} />
    </div>
  );
};

export default Home;