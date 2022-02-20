const express = require('express');
const server = express();
const next = require('next');
const path = require('path');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const router = require('./config/routes');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const uuid = require('uuid').v4;
const session = require('express-session');

const dev = false;
const app = next({dev});
const handle = app.getRequestHandler();

server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(csurf({ cookie: true }));
server.use(logger('short'));
server.use(session({
	genid: (req) => {
		return uuid()
	},
	secret: 'Hi9Cf#mK98',
	resave: false,
	saveUninitialized: true,
}));

server.use('/css', [
	express.static(__dirname + '/public/css')
]);

server.use('/icons', [
	express.static(__dirname + '/public/icons')
]);

server.use('/images', [
	express.static(__dirname + '/public/images')
]);

server.use('/img', [
	express.static(__dirname + '/public/img')
]);

server.use('/js', [
	express.static(__dirname + '/public/js')
]);

server.use('/logos', [
	express.static(__dirname + '/public/logos')
]);

server.use('/screenshots', [
	express.static(__dirname + '/public/screenshots')
]);

server.use('/', [
	express.static(__dirname + '/public/')
]);

server.use('/_next', [
	express.static(__dirname + '/out/_next/')
]);

server.use(express.static(path.join(__dirname, 'dist')));

server.use('/', (req, res, next) => {
	res.locals.session = req.session;
	next();
});

app.prepare().then(() => {
	server.use(router)
    
	server.listen(port, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:' + port);
	})
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});