const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
   
    name : {
        type : String,
        required : true
    },

     date : {
        type : Date,
        required : true 
    }
    , venueId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Venue",  
        required : true
    },
    artistId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }, compenso: {
    type: Number,
    required: true,
    min: 0
    }, stato: {
    type: String, enum: [ "In cerca di artista", "Confermato", "Cancellato",],
    default: "In cerca di artista"
    }},{ timestamps: true
});

module.exports = mongoose.model("Gig", gigSchema);