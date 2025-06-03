import mongoose from 'mongoose';
import Commentaire from './models/commentaire.model.js';

const uri = 'mongodb+srv://eliasghennam707:tqbYcFvcfkdLowGB@cluster0.joc6t2l.mongodb.net/angular_epsi?retryWrites=true&w=majority&appName=Cluster0';

await mongoose.connect(uri);
console.log('✅ Connecté à MongoDB pour injection');

await Commentaire.deleteMany(); // Supprime tout si tu veux une base propre

await Commentaire.insertMany([
  {
    nom: 'Lucas Bernard',
    commentaire: 'Très bon rapport qualité/prix !',
    image: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    nom: 'Clara Lefevre',
    commentaire: 'Le site est facile à utiliser.',
    image: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  {
    nom: 'Mickael Dumas',
    commentaire: 'Commande rapide, je suis ravi.',
    image: 'https://randomuser.me/api/portraits/men/6.jpg'
  }
]);

console.log('✅ Commentaires injectés avec succès');
process.exit();
