[![Build Status](https://travis-ci.org/baumandm/rethink-earthquakes.svg)](https://travis-ci.org/baumandm/rethink-earthquakes)

# Rethink Earthquakes

Koa & React version of [http://rethinkdb.com/blog/earthquake-geojson/]().

## Running

Requires node 0.11.x for generator support.  Install the latest version of node.js with n:

    npm install -g n
    n latest

Run with --harmony flag:

    npm install
    node --harmony app.js

Or use gulp:

    npm install -g gulp
    gulp server

Open in a web browser:

    http://localhost:3050/api/quakes/nearest?lat=35.68&long=138&range=400

## License

Released under the [MIT License](http://opensource.org/licenses/MIT).  Copyright © 2014 Dave Bauman
