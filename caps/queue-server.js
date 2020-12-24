'use strict';
require('dotenv').config();

const port = process.env.PORT || 3000;
const util = require('util');
const io = require('socket.io')(port);
const eventLogger = require('./eventLogger.js');
const uuid = require ('uuid').v4;

const caps = io.of('/caps'); //named space

console.log('CAPS / Queue, reporting for duty!');

io.on('connection', (socket) => {
  console.log('Connected to CAPS/Queue with socket ID: ', socket.id);
});

const queue = { //this queue needs to have messages keyed by retailer, event name, messageid
  message: {}
};

caps.on('connection', socket => {
  socket.on('pickup', payload => {
    console.log('In the queue - heard PICKUP', payload);

    const id = uuid();

    queue.message[id] = payload;

    caps.emit('message-added');

    caps.to(payload.store).emit('message',{id, payload: queue.message[id]});

  });

  socket.on('get-all', payload => {

    console.log('in the HUB - listening to GETALL');

    Object.keys(queue.message).forEach(id=> {
      socket.to(payload.store).emit('message', {id, payload: queue.message[id]});
    });

  });

  socket.on('received', message => {
    console.log('in hub - heard RECEIVED', message);
    delete queue.message[message.id];
  });

});




//////////////////original caps/////////////////////

caps.on('connection', (socket2) => { //connection to named space caps
  // console.log('Connected to CAPSNameSpace with socket ID: ', socket2.id);

  //vendors to join a private room within the named space
  socket2.on('join', room => {
    //log that they joined the room
    console.log(`{$socket.id} Joining ${room}`);
    socket2.join(room);
  });

  socket2.on('pickup', (payload) => {
    eventLogger('pickup', payload);
    caps.emit('pickup-ready', payload);
  }); //listener hears pickup calls eventLogger

  socket2.on('in-transit', (payload) => {
    eventLogger('in-transit', payload);
    caps.to(payload.store).emit('in-transit', payload); //payload.store === room name of each store, so only emitting to that specific room
  });

  socket2.on('delivered', (payload) => {
    eventLogger('delivered', payload);
    caps.to(payload.store).emit('delivered-ready', payload);
  });

});



