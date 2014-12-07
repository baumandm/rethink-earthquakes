var React = require('react'),
    _ = require('lodash'),
    moment = require('moment'),
    numeral = require('numeral');

var QuakeMap = React.createClass({
    componentDidMount: function () {
        var map = this.map = L.map($(this.getDOMNode()).children('.map')[0], {
            minZoom: 2,
            maxZoom: 20,
            layers: [
                L.tileLayer(
                    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
                        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                    }
                )
            ],
            attributionControl: false,
        });

        map.on('click', this.onMapClick);
        map.locate({ setView: true, maxZoom: 6 });

        if (!_.isUndefined(navigator.geolocation)) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var point = L.latLng(position.coords.latitude, position.coords.longitude);

                var userMarker = L.marker(point, {
                    icon: L.icon({
                        iconUrl: 'img/home.png',
                        iconSize: '32',
                        iconAnchor: [16, 48]
                    })
                });

                map.addLayer(userMarker);
            });
        }
    },

    componentWillUnmount: function () {
        this.map.off('click', this.onMapClick);
        this.map = null;
    },

    onMapClick: function () {
        console.log('clicked');
    },

    render: function () {

        if (!_.isEmpty(this.props) && !_.isUndefined(this.map)) {
            var map = this.map;
            
            _.each(this.props.quakes, function (quake) {
                L.circleMarker(L.latLng(
                    quake.geometry.coordinates[1],
                    quake.geometry.coordinates[0]
                ), {
                    radius: quake.properties.mag * 2,
                    fillColor: '#616161', color: '#616161'
                }).bindPopup(
                    '<div><strong>Magnitude: ' + numeral(quake.properties.mag).format('0.0') + '</strong></div>' +
                    '<div>' + moment(quake.properties.time).fromNow() + '</div>' + 
                    '<div>' + quake.properties.place + '</div>'
                ).addTo(map);
            });
        }
        return (
            <div className='quake-map'>
                <div className='map'></div>
            </div>
        );
    }
});

module.exports = QuakeMap;
