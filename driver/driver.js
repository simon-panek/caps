'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
//const capsConnection = io.connect(host);
const caps = io.connect(`${host}/caps`);

// const events = require ('../events.js');

console.log('Driver, reporting for duty!');

caps.on('pickup-ready', readyForPickup);

function readyForPickup (payload) {
  pickup(payload);
  delivered(payload);
}

function pickup(payload) {
  setTimeout ( () => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    caps.emit('in-transit', payload);
  }, 1500);
}

function delivered(payload) {
  setTimeout ( () => {
    console.log(`Driver: delivered up ${payload.orderID}`);
    caps.emit('delivered', payload);
  }, 3000);
}

// caps.on('pickup-ready', driverPickup);

// function driverPickup(payload){
//   console.log(`DRIVER: picked up ${payload.orderID}}`);
// }


