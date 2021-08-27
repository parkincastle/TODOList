var express = require('express')
var routes = require('./routes')
var todo = require('./routes/todo')
var http = require('http')
var path = require('path')

var app = express();

var port = 3000;

app.configure(function(){
    app.set('port', port);
    app.set('view', __dirname + '/view');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.longger('dev'))
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    // 정적 리소스 처리
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.configure('development', function(){
        app.use(expres.errorHandler());
    })

    app.get('/', routes.index);
    app.get('/list', todo.list);
    app.post('add', todo.add);
    
    app.post('/complete', todo.complete);
    app.post('del', todo.del);

    http.createServer(app).listen(app.get('port'), function(){
        console.log("Express server listeneing on port" + app.get('port'));
    });
});
