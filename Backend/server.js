const express = require('express'); /*Impostiamo Express, il framework che permette di creare il server
                                       web gestendo le pagine e i link (le rotte).*/
const mongoose = require('mongoose'); //Serve a parlare con MongoDB.
const path = require('path'); // Gestisce i percorsi delle cartelle
require('dotenv').config(); /*Serve a caricare le variabili segrete (come la password del database) da un file 
                              esterno chiamato .env.*/

const app = express(); // 1. Prima creiamo l'applicazione 'app'...
const PORT = process.env.PORT || 3000;

// Middleware per leggere i dati inviati dai form HTML
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. ...e SOLO ORA possiamo usare 'app' per collegare la cartella Frontend!
app.use(express.static(path.join(__dirname, '../Frontend')));

// Connessione a MongoDB (legge la stringa dal file .env)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/musicaApp')
  .then(() => console.log('Connesso con successo a MongoDB!'))
  .catch(err => console.error('Errore di connessione al database:', err));

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server acceso sulla porta ${PORT}: http://localhost:${PORT}`);
});
