const jwt = require('jsonwebtoken');

const User = require('../models/user');

const registerUser = async (req, res) => {
    try {
        // Estraiamo i dati 
        const { username, email, password, dataNascita, tipo, bio } = req.body;

        // Controllo: L'utente esiste già?
        const userExists = await User.findOne({ email });
        if (userExists) {
            // Se esiste, fermiamo tutto e inviamo un errore 400 (Bad Request)
            return res.status(400).json({ message: "Un utente con questa email esiste già." });
        }

        // Creiamo il nuovo utente
        const newUser = new User({
            username,
            email,
            password, // Il tuo user.js la cripterà in automatico grazie al "pre('save')"!
            dataNascita,
            tipo,
            bio
        });

        // Salviamo nel database MongoDB
        await newUser.save();

        // Access Token (15 minuti)
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Refresh Token (1 settimana)
        const refreshToken = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        newUser.refreshTokens.push(refreshToken);
        await newUser.save();

        // Rispondiamo al frontend con successo (Status 201: Created)
        res.status(201).json({ 
            message: "Utente registrato con successo!",
            user: { id: newUser._id, username: newUser.username, dataNascita: newUser.dataNascita, tipo: newUser.tipo, bio: newUser.bio },
            accessToken,
            refreshToken
        });

    } catch (error) {
         console.error(error);
        res.status(500).json({ message: 'errore del server' });
    }
};

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // If the user is not found, return a 401 Unauthorized response with an appropriate message
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        
        // If the passwords do not match, return a 401 Unauthorized response with an appropriate message
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If the user is authenticated successfully, generate a JWT token that includes the user's ID as the payload.
        // The token is signed with a secret key defined in the environment variables and has an expiration time of 1 hour.

        // Access Token (15 minuti)
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Refresh Token (1 settimana)
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );


        user.refreshTokens.push(refreshToken);
        await user.save();

        // Return a 200 OK response with the generated token and the authenticated user's information
        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                username: user.username,
                dataNascita: user.dataNascita,
                tipo: user.tipo,
                bio: user.bio
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'errore del server' });
    }
}

async function logout(req, res) {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token richiesto per il logout' });
        }

        // Decodifichiamo il token per trovare l'ID utente
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
        // Rimuoviamo il token specifico dall'array nel database
        await User.findByIdAndUpdate(decoded.userId, {
            $pull: { refreshTokens: refreshToken }
        });

        return res.status(200).json({ message: 'Logout effettuato con successo. Token revocato.' });
    } catch (error) {
        // Se il token è già matematicamente scaduto o corrotto, consideriamo il logout riuscito
        return res.status(200).json({ message: 'Disconnesso.' });
    }
}

module.exports = {
    registerUser,
    login,
    logout
};