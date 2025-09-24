const mongoose = require('mongoose');

const oltSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Olt = mongoose.model('Olt', oltSchema);

module.exports = Olt;