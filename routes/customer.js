const error = require('restify-errors');
const User = require('../models/user');


module.exports = server => {
    server.get('/customer', async (req, res, next) => {
        try {
            const customer = await User.find({});
            res.send(customer);
            next();

        } catch (err) {
            return next(new error.InvalidContentError(err));

        }
    });
    server.get('/customer/:id', async (req, res, next) => {
        try {
            const customer = await User.findById(req.params.id);
            res.send(customer);
            next();

        } catch (err) {
            return next(new error.ResourceNotFoundError(err));

        }
    });
    server.post('/customer', async (req, res, next) => {
        try {
            if (!req.is('application/json')) {
                return next(new error.InvalidContentError("Expects 'application/json'"));
            }
            const { name, email, balance } = req.body;
            const customer = new User({ name, email, balance });

            const newCustomer = await customer.save();
            res.send(201);
            next();
        }
        catch (err) {
            return next(new error.InternalError(err.message));
        }
    });
    server.put('/customer/:id', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new error.InvalidContentError("Expects 'application/json'"));
        }
        try {
            const newCustomer = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(201);
            next();
        }
        catch (err) {
            return next(new error.ResourceNotFoundError(`User with this id ${req.params.id} is not found`));
        }
    });
    server.del('/customer/:id', async (req, res, next) => {
        try {
            const newCustomer = await User.findOneAndRemove({ _id: req.params.id });
            res.send(204);
            next();

        } catch (err) {
            return next(new error.ResourceNotFoundError(`User with this id ${req.params.id} is not found`));
        }
    })


}