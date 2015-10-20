_Evented-graph_ is a _[Graph](https://npmjs.org/package/tolstoy)_, inherited from _EventEmitter_, which is more useful in some practical cases, comparing to the pure graph. _Evented-graph_ emits mutator events: `add`, `delete`, `clear`, `connect`, `disconnect`. It also emits `change` for any actual mutation took place.


## Usage

[![npm install evented-graph](https://nodei.co/npm/evented-graph.png?mini=true)](https://npmjs.org/package/evented-graph/)

```js
var Graph = require('evented-graph');

var graph = new Graph();

graph.on('add', function (node) {
	console.log('Add a new node ', node);
});

graph.add(1);
```

## Related

> [tolstoy](https://npmjs.org/package/tolstoy) — generic graph structure with ascetic API.
> [stream-graph](https://npmjs.org/package/stream-graph) — graph with nodes represented with streams and connections with pipes.
> [audio-graph](https://npmjs.org/package/audio-graph) — graph for connected pcm-streams.
> [evented-array](https://npmjs.org/package/evented-array) — Array, inherited from EventEmitter and emitting mutator events.