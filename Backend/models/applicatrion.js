const moongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
    artistaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, gestoreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }, gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig",
        required: true,
    },proposta: {
    type: String,
    required: true,
    maxlength: 1000,
    },
     stato: {
    type: String, enum: ["in attesa", "accettata", "rifiutata"],
    default: "in attesa"
    }},{ 
        timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);
