import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Map from '../../components/Map';

const socket = io('http://localhost:5000');

const Home = () => {
  const [locations, setLocations] = useState([]);//almaceno el objeto de ubicacion

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;

        const newLocation = { latitude, longitude };
        setLocations((prevLocations) => [...prevLocations, newLocation]);

        socket.emit('updateLocation', newLocation);
      });
    }

    socket.on('locationUpdated', (data) => {
      setLocations((prevLocations) => [...prevLocations, data]);
    });

    return () => {
      socket.off('locationUpdated');
    };
  }, []);

  return (
    <div>
      <Map locations={locations} />
    </div>
  );
};

export default Home;