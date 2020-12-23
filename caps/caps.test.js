'use strict';

const faker = require('faker');
const vendor = require('../vendor/vendor.js');
const driver = require('../driver/driver.js');
const eventLogger = require('../caps/eventLogger');

describe('CAPS console Logs', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  let payload =
 { store: 'StoreTester',
   orderID: `${faker.random.uuid()}`,
   customer: `${faker.name.findName()}`,
   address: `${faker.address.city()}, ${faker.address.state()}` };

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('1. Console logs an Event', () => {
    eventLogger('pickup', payload);
    expect(consoleSpy).toBeCalled();
  });

  it('2. Console logs an Event', () => {
    eventLogger('in-transit', payload);
    expect(consoleSpy).toBeCalled();
  });

  it('3. Console logs an Event', () => {
    eventLogger('delivered', payload);
    expect(consoleSpy).toBeCalled();
  });

});

