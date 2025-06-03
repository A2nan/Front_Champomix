import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import commentaireRoutes from './routes/commentaire.routes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/commentaires', commentaireRoutes);

// Connexion MongoDB
mongoose.connect('mongodb+srv://eliasghennam707:tqbYcFvcfkdLowGB@cluster0.joc6t2l.mongodb.net/angular_epsi?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => {
  console.log('✅ Connecté à MongoDB');
  app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
}).catch(err => console.error('❌ Erreur MongoDB :', err));
