'use strict';
require('dotenv').config();

const port = process.env.PORT || 3000;
const util = require('util');
const io = require('socket.io')(port);
const eventLogger = require('./eventLogger.js');
const uuid = require ('uuid').v4;

const caps = io.of('/caps'); //named space

console.log('CAPS / Queue, reporting for duty!');

io.on('connection', (socket) => {
  // console.log('CL#1 Connected to CAPS/Queue with socket ID: ', socket.id);
});

const queue = { //this queue needs to have messages keyed by retailer, event name, messageid
  message: {}
};

caps.on('connection', socket => {

  //vendors to join a private room within the named space
  socket.on('join', room => {
    //log that they joined the room
    console.log(`${socket.id} Joining ${room}`);
    socket.join(room);
  });

  /////////////////////--PICKUP--///////////////////////////

  socket.on('pickup', payload => { //listening for pickup
    // console.log('CL#2 In HUB - heard PICKUP', payload);

    const id = uuid(); //create a new unique message id

    queue.message[id] = {event: 'pickup', payload}; //add the creation event payload to the que with the unique message id
    // console.log('CL#3 queue', queue);

    eventLogger('pickup', payload); //log the pickup
    caps.emit('pickup', {id, payload: queue.message[id]}); //send out pickup so the driver can hear it

  });

  ////////////////////--IN-TRANSIT--////////////////////////////

  socket.on('in-transit', payload => { //listening for in-transit from driver
// console.log('CL#4 In HUB - heard IN-TRANSIT', payload);

    const id = uuid(); //create a new unique message id
    queue.message[id] = {event: 'in-transit', payload}; //add the payload to the queue with the unique message id
    // console.log('CL#5 queue', queue);

    eventLogger('in-transit', payload); //log the in-transit event
    caps.to(payload.store).emit('in-transit',{id, payload: queue.message[id]}); //pass on in-transit to the correct vendor

  });

  ///////////////////////////--DELIVERED--///////////////////////////

  socket.on('delivered', payload => { //listening for delivered
// console.log('CL#6 In HUB - heard DELIVERED', payload);

    const id = uuid(); //create a new unique message id
    queue.message[id] = {event: 'delivered', payload}; //add the payload to the queue with the unique message id
    // console.log('CL#7 queue', queue);

    eventLogger('delivered', payload); //log the delivered
    caps.to(payload.store).emit('delivered',{id, payload: queue.message[id]}); //pass on the delivery notification to the correct vendor

  });

  ///////////////////////////--GET-ALL--//////////////////////////////

  socket.on('get-all', payload => {

// console.log('CL#8 in the HUB - listening to GETALL from: ', payload);

    Object.keys(queue.message).forEach(id=> {
      socket.emit('messageQ', {id, payload: queue.message[id]});
// console.log('CL#9 in the HUB GETALL - queue: ', queue.message[id]);
    });

  });

  //////////////////////////--RECEIVED--/////////////////////////////

  socket.on('received', id => {
    // console.log('CL#9 in hub - heard RECEIVED', id);
    delete queue.message[id];
  });


});


//////////////////original caps/////////////////////

//caps.on('connection', (socket2) => { //connection to named space caps
// console.log('Connected to CAPSNameSpace with socket ID: ', socket2.id);

// //vendors to join a private room within the named space
// socket2.on('join', room => {
//   //log that they joined the room
//   console.log(`${socket2.id} Joining ${room}`);
//   socket2.join(room);
// });

// socket2.on('pickup', (payload) => {
//   eventLogger('pickup', payload);
//   caps.emit('pickup', payload);
// }); //listener hears pickup calls eventLogger

// socket2.on('in-transit', (payload) => {
//   eventLogger('in-transit', payload);
//   caps.to(payload.store).emit('in-transit', payload); //payload.store === room name of each store, so only emitting to that specific room
// });

// socket2.on('delivered', (payload) => {
//   eventLogger('delivered', payload);
//   caps.to(payload.store).emit('delivered', payload);
// });

//});



