import express from 'express';
import Commentaire from '../models/commentaire.model.js';

const router = express.Router();

// GET - tous les commentaires
router.get('/', async (req, res) => {
  try {
    const commentaires = await Commentaire.find();
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
