const error = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/member');
const auth = require('../auth');
const JWT_SECRET = require('../config').JWT_SECRET;

module.exports = server => {
    server.post('/register', (req, res, next) => {
        const { email, password } = req.body;
        const user = new User({ email, password });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                user.password = hash;
                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();

                } catch (err) {
                    return next(new error.InternalError(err.message));

                }

            });
        });


    });
    server.post('/auth', async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await auth.authenticate(email, password);
            const token = jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: '15m' });
            const { iat, exp } = jwt.decode(token);
            res.send({ iat, exp, token });
            next();
        }
        catch (err) {
            next(new error.UnauthorizedError(err));

        }

    })
}