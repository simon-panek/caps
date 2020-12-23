'use strict';
require('dotenv').config();

const port = process.env.PORT || 3000;
const util = require('util');
const io = require('socket.io')(port);
const eventLogger = require('./eventLogger.js');

const caps = io.of('/caps');

console.log('CAPS, reporting for duty!');

io.on('connection', (socket) => {
// console.log('Connected to CAPS with socket ID: ', socket.id);
});

caps.on('connection', (socket2) => {
  // console.log('Connected to CAPSNameSpace with socket ID: ', socket2.id);

  socket2.on('pickup', (payload) => {
    eventLogger('pickup', payload);
    caps.emit('pickup-ready', payload);
  }); //listener hears pickup calls eventLogger

  socket2.on('in-transit', (payload) => eventLogger('in-transit', payload));

  socket2.on('delivered', (payload) => {
    eventLogger('delivered', payload);
    caps.emit('delivered-ready', payload);
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


