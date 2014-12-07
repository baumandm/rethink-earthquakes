var React = require('react'),
    moment = require('moment'),
    numeral = require('numeral');

var QuakeList = React.createClass({

    render: function() {
        return (
            <ul className='quake-list'>
                {this.props.quakes.map(function (quake) {
                    return (
                        <li key={quake.id}>
                            <div className='magnitude'>
                                { numeral(quake.properties.mag).format('0.0') }
                            </div>
                            <div className='details'>
                                <div>{ quake.properties.type } { moment(quake.properties.time).fromNow() }</div>
                                <div>{ quake.properties.place }</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
});

module.exports = QuakeList;
