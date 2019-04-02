
jest.mock('../knexClient');

const insertMock = jest.fn();
const knex = require('../knexClient');
knex.mockImplementation(() => ({
  insert: insertMock.mockImplementation(() => ({
    returning: () => Promise.resolve([5])
  }))
}));

const addItem = require('./addItem');

describe('Add item command', () => {
  test('Inserts row into database', async () => {
    const res = await addItem("Cheese");
    expect(insertMock).toHaveBeenCalledWith({ name: "Cheese" });
    expect(res).toEqual({ id: 5, name: 'Cheese', purchased: false })
  });

});
