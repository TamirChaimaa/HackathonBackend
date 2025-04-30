const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialiser l'application Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const uri = 'mongodb+srv://chaimaatamir34:dfzlB5G5hJAfThwS@cluster0.atnroxw.mongodb.net/Hackathon?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connexion réussie à MongoDB Atlas'))
.catch((err) => console.error('❌ Erreur de connexion :', err));

// Routes
const authRouter = require('./controllers/authController.js');
app.use('/user', authRouter);
const postRouter = require('./controllers/postController.js');
app.use('/post', postRouter);

// Route de test
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
