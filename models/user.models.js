const mongoose = require('mongoose');
require('../config/db_mongo');
// const bcrypt = require('bcrypt');

const TokenSchema = new mongoose.Schema({
  monument_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Monument' 
  },
  collected_at: { 
    type: Date, 
    required: true 
  }
});

const ProgressSchema = new mongoose.Schema({
  city: { 
    type: String, 
    required: true 
  },
  tokens_collected: { 
    type: Number, 
    required: true 
  },
  total_tokens: { 
    type: Number, 
    required: true 
  }
});

const objSchema = {
  name: { 
    type: String, 
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isLoggedIn: { 
    type: Boolean, 
    default: false 
  },
  lastLogin: { 
    type: Date 
  },
  tokens: { 
    type: [TokenSchema], 
    default: [] 
  },
  progress: { 
    type: [ProgressSchema], 
    default: [] 
  }
};

const UserSchema = mongoose.Schema(objSchema, { timestamps: true });

// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (err) {
//       return next(err);
//     }
//   });

//   UserSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
//   };
  
const User = mongoose.model('User', UserSchema);

module.exports = User;

// const newUser = {
//     name:'Luis Carlos',
//     email:'luisc@gmail.com',
//     password: 'hola',
//     role: 'admin'
// }

// const saveUser = async () => {
//     try {
//       const user = new User(newUser);
//       const savedUser = await user.save();
//       console.log('Usuario guardada:', savedUser);
//     } catch (error) {
//       console.error('Error al guardar el usuario:', error);
//     } finally {
//       mongoose.connection.close();
//     }
//   };
//   saveUser();







