jest.mock('../knexClient');

const selectMock = jest.fn();
const knex = require('../knexClient');
knex.mockImplementation(() => ({
  select: selectMock.mockReturnValue(Promise.resolve([
      { id: 1, name: 'Cheese', purchased: 1 },
      { id: 2, name: 'Milk', purchased: 0 }
    ]))
  })
);

const getItems = require('./getItems');

describe('Get items query', () => {
  test('Fetches and processes data', async () => {
    const results = await getItems();
    expect(knex).toHaveBeenCalledWith('items');
    expect(selectMock).toHaveBeenCalledWith('id', 'name', 'purchased');
    expect(results).toHaveLength(2);
    expect(results).toContainEqual(
      { id: 1, name: 'Cheese', purchased: true }
    );
    expect(results).toContainEqual(
      { id: 2, name: 'Milk', purchased: false }
    );
  });

});
