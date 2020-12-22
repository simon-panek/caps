'use strict'; 

const events = require ('./events.js');

events.on('pickup-ready', readyForPickup);

function readyForPickup (payload) {
  // console.log('driver: payload ', payload);
  pickup(payload);

  delivered(payload);
}
// function readyForPickup(){
//   setTimeout(() => pickup, 1000);
// }

async function pickup(payload) {
  await setTimeout ( () => {
    // console.log('driver: pickup payload', payload);
    console.log(`DRIVER: picked up ${payload.orderID}}`);
    events.emit('in-transit', payload);
  }, 1000);
  //setTimeout(delivered, 3000);
}

async function delivered(payload) {
  await setTimeout ( () => {
    console.log(`Driver: delivered up ${payload.orderID}`);
    events.emit('delivered', payload);
  }, 3000);
}
