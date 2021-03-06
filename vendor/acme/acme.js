'use strict';
const util = require ('util');
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const socket = io.connect(`${host}/caps`); //connecting to the caps name space


const storeName = 'acme-widgets'; //store name

//let messageChecker; //declare a switch variable for controlling the confirmation message

console.log('Widget vendor, reporting for duty!');

//join the private room
socket.emit('join', storeName); //put them in a private room that has their store name

let vendorPayload = { clientID: storeName, event: 'delivered'}; //set payload for get-all request

socket.emit('get-all', vendorPayload); //retrieve all messages in queue

socket.on('messageQ', message => { //receiving queued messages from Q
  // console.log('A-CSL#1 in queued messages heard - MESSAGEQ: ', message);
  if(message.payload.event === 'delivered' && message.payload.payload.store === storeName) { //if the event in the queued message is 'delivered' call the thankyou function with the payload
    thankYou(message);
  }
  if(message.payload.event === 'in-transit' && message.payload.payload.store === storeName) { //if the event in the queued message is 'delivered' call the thankyou function with the payload
    socket.emit('received', message.id); //respond to Q that message was received and delete
  }
});

socket.on('in-transit', message => { //listen for in-transit
  // console.log('A-CSL#2 in ACME received MESSAGE', message); 
  socket.emit('received', message.id); //respond with confirmation message
});


setInterval(() => { //create new payload every 5 seconds
  let payload =
 { store: storeName,
   orderID: `${faker.random.uuid()}`,
   customer: `${faker.name.findName()}`,
   address: `${faker.address.city()}, ${faker.address.state()}` };
// console.log('order: ', payload);
  socket.emit('pickup', payload);

}, 5000);

socket.on('delivered', thankYou); //listen for delivered and fire thankYou

function thankYou(message){
// console.log('A-CSL#3 ThankYou ', message);
  console.log(`VENDOR: Thank you for delivering ${message.payload.payload.orderID}`); //log thankyou & order ID

  socket.emit('received', message.id); //respond with confirmation message
}

module.exports = thankYou;
