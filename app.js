const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4567;
const router = require('./config/routes');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const uuid = require('uuid').v4;
const session = require('express-session');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use(logger('short'));
app.use(session({
	genid: (req) => {
		return uuid()
	},
	secret: 'Hi9Cf#mK98',
	resave: false,
	saveUninitialized: true,
}));

app.use('/css', [
	express.static(__dirname + '/public/css')
]);

app.use('/img', [
	express.static(__dirname + '/public/img')
]);

app.use('/js', [
	express.static(__dirname + '/public/js')
]);

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', (req, res, next) => {
	res.locals.session = req.session;
	next();
});

app.use(router);

server.listen(port, () => {
	console.log('Servidor rodando na porta ' + port);
});
