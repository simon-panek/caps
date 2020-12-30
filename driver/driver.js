'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

//let messageChecker; //declare a switch variable for the confirmation message

console.log('Driver, reporting for duty!'); //client is working

let driverPayload = {clientID: 'driver', event: 'pickup'}; //set payload for requesting get-all

socket.emit('get-all', driverPayload); //request all queued messages

socket.on('messageQ', message => { //receiving queued messages from Q
// console.log('D-CSL#1 in queued messages heard - MESSAGEQ: ', message);
  if(message.payload.event === 'pickup') { //if the event in the queued message is 'pickup' call the thankyou function with the payload
    readyForPickup(message);
  }

});

socket.on('pickup', readyForPickup); //listen for pickup and fire readyForPickup

function readyForPickup (message) {
// console.log('D-CSL#2 payload ', message);
  pickup(message); //fire pickup
  delivered(message); //fire delivered

  socket.emit('received', message.id); //sends out confirmation of receipt payload should have message id

}

function pickup(message) {
  setTimeout ( () => {
  // console.log('D-CSL#3 message ', message);
    console.log(`DRIVER: picked up ${message.payload.payload.orderID}`); //log driver pickup and order ID
    socket.emit('in-transit', message.payload.payload); //emit in-transit to Q
  }, 1500);
}

function delivered(message) {
  setTimeout ( () => {

// console.log('D-CSL#4 message ', message);
    console.log(`Driver: delivered up ${message.payload.payload.orderID}`); //log driver delivered and order ID
    socket.emit('delivered', message.payload.payload); //emit delivered to Q
  }, 3000);
}

module.exports = { readyForPickup, pickup, delivered };


