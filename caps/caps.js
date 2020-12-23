'use strict';
require('dotenv').config();

const port = process.env.PORT || 3000;
const util = require('util');
const io = require('socket.io')(port);

const caps = io.of('/caps');

//const events = require ('../events.js'); //connect to event pool

// require('../driver.js'); //connect to driver
// require('../vendor.js'); //connect to vendor

console.log('CAPS, reporting for duty!');

io.on('connection', (socket) => {
  console.log('Connected to CAPS with socket ID: ', socket.id);

  caps.on('connection', (socket2) => {
    console.log('Connected to CAPSNameSpace with socket ID: ', socket2.id);

    socket2.on('pickup', (payload) => console.log('pickup @ CAPS', payload)); //eventLogger('pickup', payload)); //listener hears pickup calls eventLogger
    caps.on('in-transit', (payload) => eventLogger('in-transit', payload));
    caps.on('delivered', (payload) => eventLogger('delivered', payload));

    function eventLogger (event, payload) {

      if(event === 'delivered') { //if incoming is delivered send out delivered-ready
        caps.emit('delivered-ready', payload);
      }

      const time = Date(); //time stamp
      console.log(`Event , { event: ${event}, time: ${time}, payload: ${util.inspect(payload, { showHidden: false, depth: null})}`); //log the event

      if(event === 'delivered-ready'){//if incoming is delivered append break for ease of review
        console.log('------------------Transaction Break------------------');
      }

      if(event === 'pickup-ready'){//if incoming is pickup send out pickup-ready
        caps.emit('pickup-ready', payload);
      }
    }
  });

});

// io.on('pickup', (payload) => {

//   console.log(`EVENT {
//     event: pickup,
//     time: ${Date()},
//     payload: ${util.inspect(payload, { showHidden: false, depth: null})}
//   }`);
//   io.emit('pickup-ready', payload);
// });

// io.on('in-transit', (payload) => {
//   console.log(`EVENT {
//     event: in-transit,
//     time: ${Date()},
//     payload: ${util.inspect(payload, { showHidden: false, depth: null})}
//   }`);
// });

// io.on('delivered', (payload) => {
//   io.emit('delivered-ready', payload);
//   console.log(`EVENT {
//     event: delivered,
//     time: ${Date()},
//     payload: ${util.inspect(payload, { showHidden: false, depth: null})}
//   }`);
//   console.log('////////////////Transaction Break/////////////////');
// });
