import React, { useEffect } from "react";

const apiKey = '5ae2e3f221c38a28845f05b6ab592ae59e34ce6e408882f6275cefcf';
const city = 'madrid';
const radius = 50000;

const Places = ({ setPlacesCoords }) => {

  const touristPlaces = [
    'Plaza Mayor', 
    'Palacio Real de Madrid', 
    'Museo del Prado', 
    'Parque del Retiro', 
    'Puerta del Sol',
    'Statue of the Bear and the Strawberry Tree',
    'Templo de Debod',
    'Catedral de la Almudena',
    'Museo Reina Sofía',
    'Plaza de Cibeles',
    'Museo Thyssen-Bornemisza',
    'El Rastro',
    'Estadio Santiago Bernabéu',
    'Puerta de Alcalá',
    'Casa de Campo',
    'Mercado de San Miguel',
    'Jardín Botánico',
    'Teatro Real',
    'Museo Arqueológico Nacional',
    'Plaza de España',
    'Zoo Aquarium de Madrid',
    'Matadero Madrid',
    'Palacio de Cristal',
    'Parque de Atracciones',
    'CaixaForum Madrid',
    'Palacio de Linares',
    'Teatro Real',
    'Plaza de Oriente',
    'Museo de Cera',
    'Museo del Ferrocarril'
  ];

  useEffect(() => {
    const fetchOpenMap = async () => {
      try {
        const resp = await fetch(`http://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${apiKey}`);
        const data = await resp.json();
        const lat = data.lat;
        const lon = data.lon;
        const respTwo = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&apikey=${apiKey}`);
        const dataTwo = await respTwo.json();

        console.log("Fetched places:", dataTwo.features);

        const filteredResults = dataTwo.features.filter(feature => 
          touristPlaces.includes(feature.properties.name)
        );

        console.log("Filtered places:", filteredResults);

        const limitedResults = filteredResults.slice(0, 30);

        setPlacesCoords(limitedResults.map(feature => ({
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
          name: feature.properties.name
        })));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchOpenMap();  
  }, [setPlacesCoords]);

  return null;
};

export default Places;