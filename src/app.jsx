require('./less/styles.less');

var React = require('react');
var Earthquaker = require('./jsx/earthquaker');

React.render(
    <Earthquaker />,
    $('.earthquaker')[0]
);
