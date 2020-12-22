'use strict';

const util = require('util');

const events = require ('./events.js'); //connect to event pool

require('./driver.js'); //connect to driver
require('./vendor.js'); //connect to vendor

//example
// events.on('light-detected', (payload) => {
//   events.emit('light', {brightness: payload});
// });

events.on('pickup', (payload) => {
  // console.log('caps: payload', payload);
  console.log(`EVENT {
    event: pickup, 
    time: ${Date()},
    payload: ${util.inspect(payload, { showHidden: false, depth: null})}
  }`);
  events.emit('pickup-ready', payload);
});

events.on('in-transit', (payload) => {
  console.log(`EVENT {
    event: in-transit, 
    time: ${Date()},
    payload: ${util.inspect(payload, { showHidden: false, depth: null})}
  }`);
  // events.emit('in-transit-ready', payload);
});

events.on('delivered', (payload) => {
  events.emit('delivered-ready', payload);
  console.log(`EVENT {
    event: delivered, 
    time: ${Date()},
    payload: ${util.inspect(payload, { showHidden: false, depth: null})}
  }`);
  console.log('////////////////Transaction Break/////////////////');
});
