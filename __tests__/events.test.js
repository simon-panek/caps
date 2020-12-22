'use strict';

// const caps = require('../events.js');
const vendor = require('../vendor.js');
const driver = require('../driver.js');
const events = require('../events.js');

describe('Console Logs', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('1. Console logs Driver: Picked Up', () => {
    events.emit('pickup-ready', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

  it('2. Console logs Vendor: Thankyou', () => {
    events.emit('delivered-ready', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

  it('3.Console logs Driver: Delivered', () => {
    events.emit('pickup-ready', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

});

