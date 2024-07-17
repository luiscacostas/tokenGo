import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import Map from '../../components/Map';
import Places from '../../components/Places';
import FormMonument from '../../components/FormMonument';
import { isPointWithinRadius } from 'geolib';
import AuthContext from '../../context/AuthContext';

const socket = io('https://tokengo-production.up.railway.app');

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [placesCoords, setPlacesCoords] = useState([]);
  const [capturedMonuments, setCapturedMonuments] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        setLocations((prevLocations) => [...prevLocations, newLocation]);
        socket.emit('updateLocation', newLocation);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    socket.on('locationUpdated', (data) => {
      setLocations((prevLocations) => [...prevLocations, data]);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off('locationUpdated');
    };
  }, []);

  useEffect(() => {
    const checkProximity = () => {
      const currentLocation = locations[locations.length - 1];
      if (!currentLocation) return;

      placesCoords.forEach((place) => {
        if (!place.geometry || !place.geometry.coordinates || !place.properties || !place.properties.xid) {
          return;
        }

        const isWithinRadius = isPointWithinRadius(
          { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
          { latitude: place.geometry.coordinates[1], longitude: place.geometry.coordinates[0] },
          100 
        );

        if (isWithinRadius) {
          captureMonument(place.properties.xid);
        }
      });
    };

    checkProximity();
  }, [locations, placesCoords]);

  const captureMonument = async (monumentId) => {
    try {
      const response = await fetch('https://tokengo-production.up.railway.app/api/monuments/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ monumentId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error capturing monument');
      }

      const data = await response.json();
      console.log('Monument captured:', data);
      setCapturedMonuments((prevMonuments) => [...prevMonuments, data.monument]);
    } catch (error) {
      console.error('Error capturing monument:', error);
      alert(`Error capturing monument: ${error.message}`);
    }
  };

  const handleMonumentAdded = (newMonument) => {
    console.log(newMonument);
    setPlacesCoords((prevCoords) => [
      ...prevCoords,
      {
        geometry: {
          coordinates: [newMonument.location.coordinates[1], newMonument.location.coordinates[0]]
        },
        properties: {
          xid: newMonument._id,
          name: newMonument.name
        }
      }
    ]);
  };

  return (
    <div>
      <Places setPlacesCoords={setPlacesCoords} />
      <Map locations={locations} placesCoords={placesCoords} />
      <FormMonument onMonumentAdded={handleMonumentAdded} />
      <div>
        <h3>Captured Monuments:</h3>
        <ul>
          {capturedMonuments.map((monument, index) => (
            <li key={index}>{monument.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
