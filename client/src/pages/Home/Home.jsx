import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import Map from '../../components/Map';
import Places from '../../components/Places';
import FormMonument from '../../components/FormMonument';
import { isPointWithinRadius } from 'geolib';
import AuthContext from '../../context/AuthContext';

const socket = io('https://tokengo-z0d3.onrender.com');

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [placesCoords, setPlacesCoords] = useState([]);
  const [capturedMonuments, setCapturedMonuments] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const response = await fetch('https://tokengo-z0d3.onrender.com/api/monuments/');
        if (!response.ok) {
          throw new Error('Error fetching monuments');
        }
        const data = await response.json();
        const monuments = data.map(monument => ({
          lat: monument.location.coordinates[1], // latitud en el índice 1
          lon: monument.location.coordinates[0], // longitud en el índice 0
          name: monument.name,
          id: monument._id
        }));
        setPlacesCoords(monuments);
      } catch (error) {
        console.error('Error fetching monuments:', error);
      }
    };

    fetchMonuments();

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
  }, [token]);

  useEffect(() => {
    const checkProximity = () => {
      const currentLocation = locations[locations.length - 1];
      if (!currentLocation) return;

      placesCoords.forEach((place) => {
        if (!place.lat || !place.lon || !place.id) {
          return; 
        }

        const isWithinRadius = isPointWithinRadius(
          { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
          { latitude: place.lat, longitude: place.lon },
          100 
        );

        if (isWithinRadius) {
          captureMonument(place.id);
        }
      });
    };

    checkProximity();
  }, [locations, placesCoords]);

  const captureMonument = async (monumentId) => {
    try {
      const response = await fetch('https://tokengo-z0d3.onrender.com/api/monuments/capture', {
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
      setCapturedMonuments((prevMonuments) => [...prevMonuments, data.monument]);
      setPlacesCoords((prevCoords) => prevCoords.filter(monument => monument.id !== monumentId));
    } catch (error) {
      console.error('Error capturing monuments:', error);
      alert(`Error capturing monument: ${error.message}`);
    }
  };

  const handleMonumentAdded = (newMonument) => {
    setPlacesCoords((prevCoords) => [
      ...prevCoords,
      {
        lat: newMonument.location.coordinates[1], // latitud en el índice 1
        lon: newMonument.location.coordinates[0], // longitud en el índice 0
        name: newMonument.name,
        id: newMonument._id
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