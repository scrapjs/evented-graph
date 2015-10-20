require('babel/register');

var Graph = require('./index');
var assert = require('assert');
var Emitter = require('events').EventEmitter;

var events = [];


//add
var graph = new Graph([1, 2, 3]);

graph.on('add', function (node) {
	assert.equal(node, 4);
	events.push('add');
});

graph.add(1);
graph.add(4);


//delete
graph.on('delete', function del (node) {
	assert.equal(node, 4);
	events.push('delete');
	this.off('delete', del);
});

graph.delete(5);
graph.delete(4);


//connect
graph.on('connect', function (a, b) {
	assert.equal(a, 1);
	assert.equal(b, 2);
	events.push('connect');
});

graph.connect(5,6);
graph.connect(1,2);


//disconnect
graph.on('disconnect', function (node) {
	assert.equal(node, 1);
	events.push('disconnect');
});

graph.disconnect(5);
graph.disconnect(1);


//clear
graph.on('clear', function () {
	events.push('clear');
});
graph.clear();

assert.equal(graph.nodes.size, 0);


//instanceof graph
assert(graph instanceof Emitter);


assert.deepEqual(events, ['add', 'delete', 'connect', 'disconnect', 'clear']);