'use strict';

const io = require('socket.io-client');

class Queue {
  constructor (id) {
    this.id = id;
    this.socket = io.connect('http://localhost:3000/caps');
  }

  trigger(event, payload) {
    this.socket.emit(event, {client: this.id, payload});
  }

}

module.exports = Queue;