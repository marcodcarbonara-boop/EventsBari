const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({ username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    tipo:{
        type: String, enum: ['artista', 'gestore'],
        required: true,
    },
    dataNascita: {
        type: Date,
        required: true,
    },
    bio: {
        type: String,
        default: "",
    },refreshTokens: {
        type: [String], 
        default: [] 
    }}, {
    timestamps: true
});


userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", userSchema);
