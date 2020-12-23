'use strict';

const faker = require('faker');
const driver = require('../driver/driver.js');


describe('Driver console Logs', () => {
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

  it('1. Pickup console log', () => {
    setTimeout(() => {
      driver.pickup(payload);
      expect(consoleSpy).toBeCalled();
    }, 1500);
  });

  it('2. Delivered console log', () => {
    setTimeout(() => {
      driver.delivered(payload);
      expect(consoleSpy).toBeCalled();
    }, 3000);
  });

});
