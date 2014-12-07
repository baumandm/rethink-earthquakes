var QuakeList = React.createClass({

    render: function() {
        return (
            <ul className='quake-list'>
                {this.props.quakes.map(function (quake) {
                    return (
                        <li key={quake.id}>
                            <div className='magnitude'>
                                {numeral(quake.properties.mag).format('0.0')}
                            </div>
                            <div className='details'>
                                <div>{quake.properties.type} {moment(quake.properties.time).fromNow()}</div>
                                <div>{quake.properties.place}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
});

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
        map.locate({ setView: true, maxZoom: 8 });
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
                    fillColor: "#616161", color: "#616161"
                }).addTo(map);
            });
        }
        return (
            <div className='quake-map'>
                <div className='map'></div>
            </div>
        );
    }
});


var Earthquaker = React.createClass({
    getInitialState: function() {
        return {
            quakes: []
        };
    },

    componentDidMount: function() {
        $.get('http://localhost:3050/api/quakes', function(result) {
            if (this.isMounted()) {
                this.setState({
                    quakes: result
                });
            }
        }.bind(this));

        this.resize();
        $(window).resize(this.resize);
    },

    componentWillUnmount: function () {
        $window.off('resize', this.resize);
    },

    resize: function () {
        $(this.getDOMNode()).parent().height($(window).height() - $('.header').height());
    },

    render: function() {
        return (
            <div className='earthquaker'>
                <QuakeList quakes={this.state.quakes} />
                <QuakeMap quakes={this.state.quakes} />
            </div>
        );
    }
})

React.render(
  <Earthquaker />,
  $('.earthquaker')[0]
);

