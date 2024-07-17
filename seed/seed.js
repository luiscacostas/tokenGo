const mongoose = require('mongoose');
const Monument = require('../models/monument.models');

require('dotenv').config();
const db = process.env.MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb SEED connection success'))
  .catch((error) => console.log(error));

const seedMonuments = [
  {
    name: 'Plaza Mayor',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.415363, -3.707398]
    },
    icon: 'https://example.com/icons/plaza_mayor.png',
    isActive: true
  },
  {
    name: 'Palacio Real de Madrid',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.417957, -3.713146]
    },
    icon: 'https://example.com/icons/palacio_real.png',
    isActive: true
  },
  {
    name: 'Museo del Prado',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.413793, -3.692127]
    },
    icon: 'https://example.com/icons/museo_prado.png',
    isActive: true
  },
  {
    name: 'Parque del Retiro',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.415260, -3.683247]
    },
    icon: 'https://example.com/icons/parque_retiro.png',
    isActive: true
  },
  {
    name: 'Puerta del Sol',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.416775, -3.703790]
    },
    icon: 'https://example.com/icons/puerta_sol.png',
    isActive: true
  },
  {
    name: 'Estadio Santiago Bernabéu',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.453054, -3.688344]
    },
    icon: 'https://example.com/icons/bernabeu.png',
    isActive: true
  },
  {
    name: 'Templo de Debod',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.424018, -3.718750]
    },
    icon: 'https://example.com/icons/templo_debod.png',
    isActive: true
  },
  {
    name: 'Catedral de la Almudena',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.415345, -3.714312]
    },
    icon: 'https://example.com/icons/almudena.png',
    isActive: true
  },
  {
    name: 'Museo Reina Sofía',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.408735, -3.694157]
    },
    icon: 'https://example.com/icons/reina_sofia.png',
    isActive: true
  },
  {
    name: 'Plaza de Cibeles',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.419563, -3.693349]
    },
    icon: 'https://example.com/icons/cibeles.png',
    isActive: true
  },
  {
    name: 'Museo Thyssen-Bornemisza',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.416392, -3.694481]
    },
    icon: 'https://example.com/icons/thyssen.png',
    isActive: true
  },
  {
    name: 'El Rastro',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.408513, -3.707228]
    },
    icon: 'https://example.com/icons/rastro.png',
    isActive: true
  },
  {
    name: 'Puerta de Alcalá',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.419006, -3.688317]
    },
    icon: 'https://example.com/icons/puerta_alcala.png',
    isActive: true
  },
  {
    name: 'Casa de Campo',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.418540, -3.745715]
    },
    icon: 'https://example.com/icons/casa_campo.png',
    isActive: true
  },
  {
    name: 'Mercado de San Miguel',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.415413, -3.708011]
    },
    icon: 'https://example.com/icons/san_miguel.png',
    isActive: true
  },
  {
    name: 'Jardín Botánico',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.411905, -3.691320]
    },
    icon: 'https://example.com/icons/jardin_botanico.png',
    isActive: true
  },
  {
    name: 'Teatro Real',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.418889, -3.710278]
    },
    icon: 'https://example.com/icons/teatro_real.png',
    isActive: true
  },
  {
    name: 'Museo Arqueológico Nacional',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.422222, -3.689444]
    },
    icon: 'https://example.com/icons/arqueologico.png',
    isActive: true
  },
  {
    name: 'Plaza de España',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.423333, -3.712222]
    },
    icon: 'https://example.com/icons/plaza_espana.png',
    isActive: true
  },
  {
    name: 'Zoo Aquarium de Madrid',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.409100, -3.763400]
    },
    icon: 'https://example.com/icons/zoo.png',
    isActive: true
  },
  {
    name: 'Matadero Madrid',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.391834, -3.698156]
    },
    icon: 'https://example.com/icons/matadero.png',
    isActive: true
  },
  {
    name: 'Palacio de Cristal',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.413055, -3.682564]
    },
    icon: 'https://example.com/icons/palacio_cristal.png',
    isActive: true
  },
  {
    name: 'Parque de Atracciones',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.411089, -3.745161]
    },
    icon: 'https://example.com/icons/parque_atracciones.png',
    isActive: true
  },
  {
    name: 'CaixaForum Madrid',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.409618, -3.693840]
    },
    icon: 'https://example.com/icons/caixaforum.png',
    isActive: true
  },
  {
    name: 'Palacio de Linares',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.419240, -3.691840]
    },
    icon: 'https://example.com/icons/palacio_linares.png',
    isActive: true
  },
  {
    name: 'Plaza de Oriente',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.416275, -3.712312]
    },
    icon: 'https://example.com/icons/plaza_oriente.png',
    isActive: true
  },
  {
    name: 'Museo de Cera',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.420556, -3.688333]
    },
    icon: 'https://example.com/icons/museo_cera.png',
    isActive: true
  },
  {
    name: 'Museo del Ferrocarril',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.401945, -3.691945]
    },
    icon: 'https://example.com/icons/museo_ferrocarril.png',
    isActive: true
  },
  {
    name: 'Estación de Atocha',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.406495, -3.690641]
    },
    icon: 'https://example.com/icons/atocha.png',
    isActive: true
  },
  {
    name: 'Centro Cultural Conde Duque',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [40.428152, -3.710494]
    },
    icon: 'https://example.com/icons/conde_duque.png',
    isActive: true
  }
];

const seedDB = async () => {
  await Monument.deleteMany({});
  await Monument.insertMany(seedMonuments);
  console.log('seedDB function');
};

seedDB().then(() => {
  console.log('seeds closed connection');
  mongoose.connection.close();
});