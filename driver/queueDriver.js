'use strict';
const io = require('socket.io-client');

class Queue {
  constructor(id){
    this.id = id;
    this.socket = io.connect('http://localhost:3000');
  }

  trigger(event, payload){
    this.socket.emit(event, {clientID: this.id, payload});
  }
}

module.exports = Queue;
