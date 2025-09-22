const mongoose = require("mongoose");

const mikrotikSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    }
})

const Mikrotik = mongoose.model("Mikrotik", mikrotikSchema);

module.exports = Mikrotik;