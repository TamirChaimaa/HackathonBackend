const express = require('express');
const router = express.Router();
const PostModel = require('../models/Post');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ton_secret_key';

// D'abord les routes spécifiques

// Créer un post
router.post('/create', async (req, res) => {
    try {
        const { title, image, text } = req.body;

        const newPost = new PostModel({
            title,
            image,
            text,
        });

        await newPost.save();

        res.status(201).json({ message: "Post créé avec succès", post: newPost });
    } catch (error) {
        console.error("Erreur de création de post :", error);
        res.status(500).json({ message: "Erreur lors de la création du post", error });
    }
});

// Récupérer tous les posts
router.get('/all', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des posts", error });
    }
});

// ⚠️ Et SEULEMENT à la fin : la route dynamique par ID
router.get('/:id', async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post non trouvé" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du post", error });
    }
});
// Route pour mettre à jour un post
router.put('/:id', async (req, res) => {
    try {
        const { title, image, text } = req.body;

        // Vérifier si le post existe
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post non trouvé" });
        }

        // Mettre à jour le post
        post.title = title || post.title;
        post.image = image || post.image;
        post.text = text || post.text;

        await post.save();

        res.status(200).json({ message: "Post mis à jour avec succès", post });
    } catch (error) {
        console.error("Erreur de mise à jour de post :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du post", error });
    }
});

// Route pour supprimer un post
router.delete('/:id', async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post non trouvé" });
        }

        // Supprimer le post
        await post.remove();

        res.status(200).json({ message: "Post supprimé avec succès" });
    } catch (error) {
        console.error("Erreur de suppression de post :", error);
        res.status(500).json({ message: "Erreur lors de la suppression du post", error });
    }
});

module.exports = router;

module.exports = router;
