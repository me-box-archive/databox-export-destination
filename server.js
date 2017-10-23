const url = require('url');
const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
io.on('connection', (socket) => {
	socket.join(url.parse(socket.request.headers.referer).pathname);
});
app.use((req, res, next) => {
	io.to('/').emit('request', Date.now(), req.method, req.path, req.query, req.body);
	let dirs = req.path.substr(1).split('/');
	let namespace = '';
	for (let dir of dirs) {
		namespace += '/' + dir;
		io.to(namespace).emit('request', Date.now(), req.method, req.path.substr(namespace.length), req.query, req.body);
	}
	next();
});
app.get('*', (req, res) => {
	res.render('index');
	res.send();
});
app.all('*', (req, res) => {
	res.send();
});

server.listen(process.env.PORT || 8080);
