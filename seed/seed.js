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
      coordinates: [-3.707398, 40.415363]
    },
    icon: 'https://example.com/icons/plaza_mayor.png',
    isActive: true
  },
  {
    name: 'Palacio Real de Madrid',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.713146, 40.417957]
    },
    icon: 'https://example.com/icons/palacio_real.png',
    isActive: true
  },
  {
    name: 'Museo del Prado',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.692127, 40.413793]
    },
    icon: 'https://example.com/icons/museo_prado.png',
    isActive: true
  },
  {
    name: 'Parque del Retiro',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.683247, 40.415260]
    },
    icon: 'https://example.com/icons/parque_retiro.png',
    isActive: true
  },
  {
    name: 'Puerta del Sol',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.703790, 40.416775]
    },
    icon: 'https://example.com/icons/puerta_sol.png',
    isActive: true
  },
  {
    name: 'Estadio Santiago Bernabéu',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.688344, 40.453054]
    },
    icon: 'https://example.com/icons/bernabeu.png',
    isActive: true
  },
  {
    name: 'Templo de Debod',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.718750, 40.424018]
    },
    icon: 'https://example.com/icons/templo_debod.png',
    isActive: true
  },
  {
    name: 'Catedral de la Almudena',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.714312, 40.415345]
    },
    icon: 'https://example.com/icons/almudena.png',
    isActive: true
  },
  {
    name: 'Museo Reina Sofía',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.694157, 40.408735]
    },
    icon: 'https://example.com/icons/reina_sofia.png',
    isActive: true
  },
  {
    name: 'Plaza de Cibeles',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.693349, 40.419563]
    },
    icon: 'https://example.com/icons/cibeles.png',
    isActive: true
  },
  {
    name: 'Museo Thyssen-Bornemisza',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.694481, 40.416392]
    },
    icon: 'https://example.com/icons/thyssen.png',
    isActive: true
  },
  {
    name: 'El Rastro',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.707228, 40.408513]
    },
    icon: 'https://example.com/icons/rastro.png',
    isActive: true
  },
  {
    name: 'Puerta de Alcalá',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.688317, 40.419006]
    },
    icon: 'https://example.com/icons/puerta_alcala.png',
    isActive: true
  },
  {
    name: 'Casa de Campo',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.745715, 40.418540]
    },
    icon: 'https://example.com/icons/casa_campo.png',
    isActive: true
  },
  {
    name: 'Mercado de San Miguel',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.708011, 40.415413]
    },
    icon: 'https://example.com/icons/san_miguel.png',
    isActive: true
  },
  {
    name: 'Jardín Botánico',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.691320, 40.411905]
    },
    icon: 'https://example.com/icons/jardin_botanico.png',
    isActive: true
  },
  {
    name: 'Teatro Real',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.710278, 40.418889]
    },
    icon: 'https://example.com/icons/teatro_real.png',
    isActive: true
  },
  {
    name: 'Museo Arqueológico Nacional',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.689444, 40.422222]
    },
    icon: 'https://example.com/icons/arqueologico.png',
    isActive: true
  },
  {
    name: 'Plaza de España',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.712222, 40.423333]
    },
    icon: 'https://example.com/icons/plaza_espana.png',
    isActive: true
  },
  {
    name: 'Zoo Aquarium de Madrid',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.763400, 40.409100]
    },
    icon: 'https://example.com/icons/zoo.png',
    isActive: true
  },
  {
    name: 'Matadero Madrid',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.698156, 40.391834]
    },
    icon: 'https://example.com/icons/matadero.png',
    isActive: true
  },
  {
    name: 'Palacio de Cristal',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.682564, 40.413055]
    },
    icon: 'https://example.com/icons/palacio_cristal.png',
    isActive: true
  },
  {
    name: 'Parque de Atracciones',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.745161, 40.411089]
    },
    icon: 'https://example.com/icons/parque_atracciones.png',
    isActive: true
  },
  {
    name: 'CaixaForum Madrid',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.693840, 40.409618]
    },
    icon: 'https://example.com/icons/caixaforum.png',
    isActive: true
  },
  {
    name: 'Palacio de Linares',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.691840, 40.419240]
    },
    icon: 'https://example.com/icons/palacio_linares.png',
    isActive: true
  },
  {
    name: 'Plaza de Oriente',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.712312, 40.416275]
    },
    icon: 'https://example.com/icons/plaza_oriente.png',
    isActive: true
  },
  {
    name: 'Museo de Cera',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.688333, 40.420556]
    },
    icon: 'https://example.com/icons/museo_cera.png',
    isActive: true
  },
  {
    name: 'Museo del Ferrocarril',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.691945, 40.401945]
    },
    icon: 'https://example.com/icons/museo_ferrocarril.png',
    isActive: true
  },
  {
    name: 'Estación de Atocha',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.690641, 40.406495]
    },
    icon: 'https://example.com/icons/atocha.png',
    isActive: true
  },
  {
    name: 'Centro Cultural Conde Duque',
    city: 'Madrid',
    location: {
      type: 'Point',
      coordinates: [-3.710494, 40.428152]
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