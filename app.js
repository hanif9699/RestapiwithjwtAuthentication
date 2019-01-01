const reactify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = reactify.createServer();

server.use(reactify.plugins.bodyParser());
server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth', '/register'] }));

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.MongoDB_URI, { useNewUrlParser: true })
});

const db = mongoose.connection;

db.on('error', (err) => { console.log(err) });
db.once('open', () => {
    require('./routes/customer')(server);
    require('./routes/user')(server);
    console.log(`Server is listening on port ${config.PORT}`);
})