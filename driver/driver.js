'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

console.log('Driver, reporting for duty!');

let driverPayload = {clientID: 'driver', event: 'pickup-ready'};
socket.emit('get-all', driverPayload);

socket.on('pickup-ready', readyForPickup);

function readyForPickup (payload) {
  pickup(payload);
  delivered(payload);
}

function pickup(payload) {
  setTimeout ( () => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    socket.emit('in-transit', payload);
  }, 1500);
}

function delivered(payload) {
  setTimeout ( () => {
    console.log(`Driver: delivered up ${payload.orderID}`);
    socket.emit('delivered', payload);
  }, 3000);
}

module.exports = { readyForPickup, pickup, delivered };


