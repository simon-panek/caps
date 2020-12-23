'use strict';
require('dotenv').config();
const util = require ('util');
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const caps = io.connect(`${host}/caps`); //connecting to the caps name space


const storeName = process.env.STORE;

console.log('Vendor, reporting for duty!');

//join the private room
caps.emit('join', storeName); //put them in a private room that has their store name

setInterval(() => {
  let payload =
 { store: `${storeName}`,
   orderID: `${faker.random.uuid()}`,
   customer: `${faker.name.findName()}`,
   address: `${faker.address.city()}, ${faker.address.state()}` };
// console.log('order: ', payload);
  caps.emit('pickup', payload);

}, 5000);

caps.on('delivered-ready', thankYou);

function thankYou(payload){
  if(payload.store === storeName) {
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
  }
}

module.exports = thankYou;
