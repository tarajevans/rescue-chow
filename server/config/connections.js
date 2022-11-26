const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
    "mongodb+srv://joefish1973:!Fish6305@rescue-chow.qwstvcn.mongodb.net/rescue-chow",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = mongoose.connection;