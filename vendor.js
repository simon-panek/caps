'use strict';
require('dotenv').config();
const util = require ('util');

const faker = require('faker');

const events = require('./events.js');

const storeName = process.env.STORE;

// let randomName = faker.name.findName();
// let randomCity = faker.address.city();
// let randomState = faker.address.state();
// let randomAddress = `${randomCity}, ${randomState}`;
// let randomOrderNumber = faker.random.uuid();

//console.log('TEST: Name: ', randomName, ' City: ', randomAddress, ' OrderNumber: ', randomOrderNumber);

//example
// events.on('light', eyelid);
// function eyelid(payload){
//   if(payload.brightness >= 75){
//     console.log('eyes are squinting');
//   }
// }
// setInterval(() => {
//   let brightness = Math.ceil(Math.random() * 100);
//   events.emit('light-detected', brightness);
// }, 2000);
// module.exports = eyelid;

setInterval(() => {
  let payload =
 { store: `${storeName}`,
   orderID: `${faker.random.uuid()}`,
   customer: `${faker.name.findName()}`,
   address: `${faker.address.city()}, ${faker.address.state()}` };
  // console.log('order: ', order);
  events.emit('pickup', payload);

}, 5000);

events.on('delivered-ready', thankYou);

function thankYou(payload){
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
}
