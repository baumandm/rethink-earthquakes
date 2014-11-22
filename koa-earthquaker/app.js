var logger = require('koa-logger');
var route = require('koa-route');
var cors = require('koa-cors');
var koa = require('koa');
var app = koa();

var r = require("rethinkdb");

var databaseConfig = {
    db: "earthquake",
    host: "localhost",
    port: 28015
};

var rrun = function *(query) {
    var connection = yield r.connect(databaseConfig);

    var result = yield query.run(connection);
    
    if (connection) {
        connection.close();
    }

    return result;
};

// middleware
app.use(logger());
app.use(cors());


// route middleware
app.use(route.get('/', function *() {
    this.body = 'Hello World';
}));

app.use(route.get('/quakes', function *() {
    this.body = yield rrun(
        r.table("quakes").orderBy(
            r.desc(r.row("mag")))
    );
}));

app.use(route.get('/quakes/nearest', function *() {
    var range = parseFloat(this.query.range || 100),
        latitude = parseFloat(this.query.lat),
        longitude = parseFloat(this.query.long);

    this.body = yield rrun(
        r.table("quakes").getNearest(
            r.point(longitude, latitude),
            { index: 'geometry', unit: 'mi', maxDist: range })
    );
}));

app.listen(3050);
