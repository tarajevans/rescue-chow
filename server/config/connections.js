const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
    'mongodb+srv://joefish1973:!Fish6305@rescue-chow.qwstvcn.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = mongoose.connection;