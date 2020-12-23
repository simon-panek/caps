'use strict';
require('dotenv').config();
const util = require ('util');
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const caps = io.connect(`${host}/caps`);


const storeName = process.env.STORE;

console.log('Vendor, reporting for duty!');

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
