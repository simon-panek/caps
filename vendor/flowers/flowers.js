'use strict';
const util = require ('util');
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const socket = io.connect(`${host}/caps`); //connecting to the caps name space


const storeName = '1-206-Flowers';

console.log('Vendor, reporting for duty!');

let vendorPayload = { store: storeName, event: 'delivered'};

socket.emit('get-all', vendorPayload); //retrieve all messages in queue

socket.on('message', message => {
  console.log('in Flowers received MESSAGE', message.payload);
  socket.emit('received', message);
});

//join the private room
socket.emit('join', storeName); //put them in a private room that has their store name

setInterval(() => {
  let payload =
 { store: storeName,
   orderID: `${faker.random.uuid()}`,
   customer: `${faker.name.findName()}`,
   address: `${faker.address.city()}, ${faker.address.state()}` };
// console.log('order: ', payload);
  socket.emit('pickup', payload);

}, 5000);

socket.on('delivered-ready', thankYou);

function thankYou(payload){
  if(payload.store === storeName) {
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
  }
}

module.exports = thankYou;
