var React = require('react');
var QuakeList = require('./quakeList'),
    QuakeMap = require('./quakeMap');

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

module.exports = Earthquaker;
