const mongoose = require('mongoose');
const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,   
        required: true
    },
    capacity: {
        type: Number,
        min: 1,
        required: true,
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    strumentazione: {
    type: String,
    enum: [
        "Impianto audio",
        "Mixer",
        "Microfoni",
        "Batteria",
        "Pianoforte",
        "Luci palco",
        "Amplificatori"
    ]
    },
    foto: [{
        type: String,
    }],
    gestoreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },}, {
    timestamps: true
});



module.exports = mongoose.model("Venue", venueSchema);

