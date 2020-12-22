'use strict'; 

const { MODULESPECIFIER_TYPES } = require('@babel/types');
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

function pickup(payload) {
  setTimeout ( () => {

    // console.log('driver: pickup payload', payload);
    //console.log(`DRIVER: picked up ${payload.orderID}}`);
    events.emit('in-transit', payload);
  }, 1000);
  //setTimeout(delivered, 3000);
}

function delivered(payload) {
  setTimeout ( () => {
    console.log(`Driver: delivered up ${payload.orderID}`);
    events.emit('delivered', payload);
  }, 3000);
}

events.on('pickup-ready', consoles);

function consoles(payload){
  console.log(`DRIVER: picked up ${payload.orderID}}`);
}



module.exports = consoles;