'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

let messageChecker; //declare a switch variable for the confirmation message

console.log('Driver, reporting for duty!'); //client is working

let driverPayload = {clientID: 'driver', event: 'pickup'}; //set payload for requesting get-all

socket.emit('get-all', driverPayload); //request all queued messages

socket.on('messageQ', message => { //receiving queued messages from Q
  // console.log('D-CSL#1 in queued messages heard - MESSAGEQ: ', message);
  if(message.payload.event === 'pickup') { //if the event in the queued message is 'pickup' call the thankyou function with the payload
    readyForPickup(message.payload.payload, 0);
  }
  socket.emit('received', message.id); //respond to Q that message was received and delete
});

socket.on('pickup', readyForPickup); //listen for pickup and fire readyForPickup

function readyForPickup (message, messageChecker=1) { 
  // console.log('D-CSL#2 payload ', message);
  pickup(message.payload); //fire pickup
  delivered(message.payload); //fire delivered
  if(messageChecker === 1){ //check if message was received live or from queue
    socket.emit('received', message.id); //sends out confirmation of receipt payload should have message id
  }
}

function pickup(payload) {
  setTimeout ( () => {
    console.log(`DRIVER: picked up ${payload.orderID}`); //log driver pickup and order ID
    socket.emit('in-transit', payload); //emit in-transit to Q
  }, 1500);
}

function delivered(payload) {
  setTimeout ( () => {
    console.log(`Driver: delivered up ${payload.orderID}`); //log driver delivered and order ID
    socket.emit('delivered', payload); //emit delivered to Q
  }, 3000);
}

module.exports = { readyForPickup, pickup, delivered };


