const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User'); // Assure-toi que le chemin est correct

const JWT_SECRET = 'ton_secret_key';

// Route GET pour tester l'API
router.get('/get', (req, res) => {
    res.send('Welcome to the user API');
});

// Route d'inscription
router.post('/register', async (req, res) => {
    try {
        console.log('Hello')
        const { name, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await UserModel.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "Ce nom est déjà utilisé." });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new UserModel({ name, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
        console.error("Erreur d'inscription :", error);
        res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        console.log("Données reçues :", name, password); // Vérifier les données entrantes

        // Vérifier si l'utilisateur existe
        const user = await UserModel.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: "Identifiants invalides" });
        }

        console.log("Username en BD :", user.username);
        console.log("Mot de passe en BD :", user.password); // Vérifier le hash du mot de passe

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Identifiants invalides" });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error("Erreur de connexion :", error);
        res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
});

module.exports = router;