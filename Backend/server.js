const express = require ('express'); /*Impostiamo Express, il framework che permette di creare il server
                                       web gestendo le pagine e i link (le rotte).*/
const mongoose = require('mongoose'); //Serve a parlare con MongoDB.
require('dotenv').config(); /*Serve a caricare le variabili segrete (come la password del database) da un file 
                              esterno chiamato .en. In questo modo non rischiate di pubblicare la password
                              su GitHub per errore.*/
// Dice a Express di uscire da Backend e pescare i file da Frontend
const path = require('path');
app.use(express.static(path.join(__dirname, '../Frontend')));
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware per leggere i dati inviati dai form HTML
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rende i file HTML e CSS della cartella 'public' accessibili al browser
app.use(express.static('public'));

// Connessione a MongoDB (sostituirete la stringa con la vostra su MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/musicaApp')
  .then(() => console.log('Connesso con successo a MongoDB!'))
  .catch(err => console.error('Errore di connessione al database:', err));

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server acceso sulla porta ${PORT}: http://localhost:${PORT}`);
});

