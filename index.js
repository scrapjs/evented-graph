/**
 * Evented version of a graph
 *
 * @module evented-graph
 */

var Graph = require('tolstoy');
var Emitter = require('events').EventEmitter;
var inherits = require('inherits');
var extend = require('xtend/mutable');


function EventedGraph (arg) {
	if (!(this instanceof EventedGraph)) return new EventedGraph(arg);

	Emitter.call(this);

	//constructor doesn’t check type of this
	Graph.prototype.constructor.call(this, arg);
};


/**
 * Add inheritance — being an emitter is more important than being a graph,
 * as it is supposed that evented-graph
 * is the highest possible graph structure per-project
 * you normally never check EventedGraph instanceof Graph.
 */
inherits(EventedGraph, Emitter);
extend(EventedGraph.prototype, Graph.prototype);

EventedGraph.prototype.off = function () {
	if (arguments.length > 1) {
		Emitter.prototype.removeListener.apply(this, arguments);
	} else {
		Emitter.prototype.removeAllListeners.apply(this, arguments);
	}
};


/**
 * Redefine mutator methods
 */
'clear add delete'.split(' ').forEach(function (methName) {
	var pureMeth = Graph.prototype[methName];

	EventedGraph.prototype[methName] = function (a) {
		var prev = this.nodes.size;
		var res = pureMeth.call(this, a);
		if (this.nodes.size !== prev) {
			this.emit.call(this, methName, a);
			this.emit('change');
		}
		return res;
	};
});
'connect disconnect'.split(' ').forEach(function (methName) {
	var pureMeth = Graph.prototype[methName];

	EventedGraph.prototype[methName] = function (a, b) {
		if (!this.nodes.has(a)) {
			return pureMeth.call(this, a, b);
		}

		var res;
		var prev = this.edges.get(a).size;

		if (arguments.length < 2 ) {
			this.outputs.get(a).forEach(function (target) {
				pureMeth.call(this, a, target);
			}, this);
			res = this.edges.get(a).size !== prev;
		} else {
			res = pureMeth.call(this, a, b);
		}

		if (this.edges.get(a).size !== prev) {
			this.emit.call(this, methName, a, b);
			this.emit('change');
		}
		return res;
	};
});


module.exports = EventedGraph;