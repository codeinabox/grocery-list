jest.mock('../knexClient');

const whereMock = jest.fn();
const updateMock = jest.fn();
const knex = require('../knexClient');
knex.mockImplementation(() => ({
  where: whereMock.mockImplementation(() => ({
    update: updateMock.mockReturnValue(Promise.resolve())
  }))
}));

const markItemAsPurchased = require('./markItemAsPurchased');

describe('Mark item as purchased command', () => {
  test('Updates row in database', async () => {
    const res = await markItemAsPurchased(5);
    expect(whereMock).toHaveBeenCalledWith('id', '=', 5);
    expect(updateMock).toHaveBeenCalledWith({ purchased: 1 });
  });

});
