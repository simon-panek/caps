'use strict';

const events = require ('./events.js'); //connect to event pool

require('./driver.js'); //connect to driver
require('./vendor.js'); //connect to vendor

//example
// events.on('light-detected', (payload) => {
//   events.emit('light', {brightness: payload});
// });

events.on('pickup', (payload) => {
  console.log(`EVENT {
    event: pickup, 
    time: ${Date.now()},
    payload: ${payload}
  }`);
});

events.on('in-transit', (payload) => {
  console.log(`EVENT {
    event: readyForPickup, 
    time: ${Date.now()},
    payload: ${payload}
  }`);
});

events.on('delivered', (payload) => {
  console.log(`EVENT {
    event: readyForPickup, 
    time: ${Date.now()},
    payload: ${payload}
  }`);
});
