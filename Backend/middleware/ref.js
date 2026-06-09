const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Missing refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.userId);
        
        if (!user || !user.refreshTokens.includes(refreshToken)) {
            return res.status(401).json({ message: 'Invalid or revoked refresh token' });
        }

        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        return res.json({ accessToken: newAccessToken });

    } catch (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
}

module.exports = {
    refreshToken
};