'use strict';

const faker = require('faker');

const events = require('./events.js');

const storeName = process.env.STORE;

let randomName = faker.name.findName();
let randomAddress = faker.address.city();
let randomOrderNumber = faker.random.uuid();

console.log('TEST: Name: ', randomName, ' City: ', randomAddress, ' OrderNumber: ', randomOrderNumber);

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
  let order =
 { store: storeName,
   orderID: randomOrderNumber,
   customer: randomName,
   address: randomAddress };
  events.emit('pickup', order);
}, 5000);

events.on('delivered', thankYou);

function thankYou(payload){
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
}
