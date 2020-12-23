'use strict';
require('dotenv').config();

const port = process.env.PORT || 3000;
const util = require('util');
const io = require('socket.io')(port);
const eventLogger = require('./eventLogger.js');

const caps = io.of('/caps'); //named space

console.log('CAPS, reporting for duty!');

io.on('connection', (socket) => {
// console.log('Connected to CAPS with socket ID: ', socket.id);
});



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

// function eventLogger (event, payload) {
//   console.log('inside eventLogger. event: ', event, 'payload ', payload);
//   if(event === 'delivered') { //if incoming is delivered send out delivered-ready
//     caps.emit('delivered-ready', payload);
//   }

//   const time = Date(); //time stamp
//   console.log(`Event {
//         event: ${event},
//         time: ${time},
//         payload: ${util.inspect(payload, { showHidden: false, depth: null})}`); //log the event

//   if(event === 'delivered'){//if incoming is delivered append break for ease of review
//     console.log('------------------Transaction Break------------------');
//   }

//   if(event === 'pickup'){//if incoming is pickup send out pickup-ready
//     console.log('inside if statement');
//     caps.emit('pickup-ready', payload);
//   }
// }


