const jwt = require('jsonwebtoken');
require('dotenv').config();
const expiration = 60*60*24;

module.exports = {
    // create token (aka 'sign' token)
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload, exp:Math.floor(Date.now() / 1000) + expiration }, process.env.TOKEN_SECRET);
    },
    // authenticate token
    authMiddleware: function ({ req }) {
        // find the token
        let token = req.body.token || req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        if (!token) {
            return req;
        }
        // verify that the token matches a user
        try {
            const { data } = jwt.verify(token, process.env.TOKEN_SECRET, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        return req;
    }
}