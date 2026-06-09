const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    autoreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, destinatarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }   , voto:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    }, commento: {
        type: String,
        required: true,
        maxlength: 1000
    }, data: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);