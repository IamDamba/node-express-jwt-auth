const mongoose = require('mongoose');

const smoothieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

const Smoothie = mongoose.model('smoothies', smoothieSchema);
module.exports = Smoothie