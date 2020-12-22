'use strict'; 

const events = require ('./events.js');

events.on('pickup', setTimeout(pickup, 1000));

function pickup(payload) {
  console.log(`DRIVER: picked up${payload.orderID}}`);
  events.emit('in-transit', payload);
  setTimeout(delivered, 3000);
}

function delivered(payload) {
  console.log('delivered');
  events.emit('delivered', payload);
}
