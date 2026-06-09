const express = require('express'); /*Impostiamo Express, il framework che permette di creare il server
                                       web gestendo le pagine e i link (le rotte).*/
const mongoose = require('mongoose'); //Serve a parlare con MongoDB.
const path = require('path'); // Gestisce i percorsi delle cartelle
require('dotenv').config(); /*Serve a caricare le variabili segrete (come la password del database) da un file 
                              esterno chiamato .env.*/

const app = express(); 
const PORT = process.env.PORT || 3000;

// Middleware per leggere i dati inviati dai form HTML (req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve i file statici dalla cartella Frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

// =========================================================================
// IMPORTAZIONE MODELLO (Ora che l'ambiente e 'app' sono pronti, importiamo User)
// =========================================================================
const User = require('./user'); 

// ==========================================
// ROTTA DI REGISTRAZIONE (POST)
// ==========================================
app.post('/api/registrazione', async (req, res) => {
  try {
    // 1. Recuperiamo i dati inviati dal form HTML tramite req.body
    const { name, birthdate, scelta, email, password, passwordConfirm, bio } = req.body;

    // 2. Controllo di sicurezza: Verifichiamo che le due password coincidano
    if (password !== passwordConfirm) {
      return res.status(400).send("Errore: Le password inserite non coincidono.");
    }

    // 3. Controllo duplicati: Verifichiamo se l'email o l'username esistono già nel DB
    const userEsistente = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: name.toLowerCase() }] });
    if (userEsistente) {
      return res.status(400).send("Errore: Username o Email già in uso.");
    }

    // 4. Mappiamo i dati del form sulla struttura del nostro modello Mongoose
    const nuovoUtente = new User({
      username: name,
      email: email,
      password: password, // Verrà criptata in automatico grazie al pre-save in user.js
      tipo: scelta,       // 'artista' o 'gestore'
      dataNascita: birthdate,
      bio: bio || ""      // Se la bio è vuota mettiamo una stringa vuota
    });

    // 5. Salviamo l'utente nel database MongoDB Atlas
    await nuovoUtente.save();

    // 6. Risposta di successo
    res.status(201).send(`<h1>Registrazione completata con successo!</h1><p>Benvenuto su EventsBari, ${nuovoUtente.username}. Ora puoi effettuare il login.</p><a href="/index.html">Vai al Login</a>`);

  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    res.status(500).send("Si è verificato un errore sul server durante la registrazione.");
  }
});
// ==========================================

// Connessione a MongoDB (legge la stringa dal file .env)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/musicaApp')
  .then(() => console.log('Connesso con successo a MongoDB!'))
  .catch(err => console.error('Errore di connessione al database:', err));

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server acceso sulla porta ${PORT}: http://localhost:${PORT}`);
});