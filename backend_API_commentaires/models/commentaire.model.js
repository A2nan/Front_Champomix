import mongoose from 'mongoose';

const commentaireSchema = new mongoose.Schema({
  nom: String,
  commentaire: String,
  image: String
});

export default mongoose.model('Commentaire', commentaireSchema);
