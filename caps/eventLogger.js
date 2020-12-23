'use strict';

const util = require('util');

function eventLogger (event, payload) {

  const time = Date(); //time stamp
  console.log(`Event { 
        event: ${event}, 
        time: ${time}, 
        payload: ${util.inspect(payload, { showHidden: false, depth: null})}`); //log the event

  if(event === 'delivered'){//if incoming is delivered append break for ease of review
    console.log('------------------Transaction Break------------------');
  }

}

module.exports = eventLogger;
