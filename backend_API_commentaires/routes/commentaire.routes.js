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

// POST - ajouter un commentaire
router.post('/', async (req, res) => {
  const { nom, commentaire, image } = req.body;
  try {
    const nouveau = new Commentaire({ nom, commentaire, image });
    const saved = await nouveau.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du commentaire.' });
  }
});


export default router;
