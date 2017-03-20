const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use((req, res, next) => {
	io.sockets.emit('request', Date.now(), req.method, req.path, req.query, req.body);
	next();
});
app.get('/', (req, res) => {
	res.render('index');
	res.send();
});
app.all('*', (req, res) => {
	res.send();
});

server.listen(process.env.PORT || 8080);
