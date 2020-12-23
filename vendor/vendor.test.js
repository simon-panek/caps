'use strict';

const faker = require('faker');
const vendor = require('../vendor/vendor.js');


describe('Vendor console Log', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  let payload =
 { store: 'FlowerPower',
   orderID: `${faker.random.uuid()}`,
   customer: `${faker.name.findName()}`,
   address: `${faker.address.city()}, ${faker.address.state()}` };

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('1. Console logs an Event', () => {
    vendor(payload);
    expect(consoleSpy).toBeCalled();
  });

});
