const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
    "mongodb+srv://tarajevans:Merlin320!@cluster0.fr9gdbw.mongodb.net/rescue-chow",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = mongoose.connection;