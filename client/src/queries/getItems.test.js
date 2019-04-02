const getItems = require('./getItems').default;

describe('Get items query', () => {
  test('Returns data from the API', async () => {
    fetch.mockResponse(JSON.stringify([
      { id: 1, item: "Cheese", purchased: false }
    ]))

    const items = await getItems()
    expect(fetch).toHaveBeenCalledWith('/api/items')
    expect(items).toHaveLength(1)
    expect(items).toContainEqual({ id: 1, item: "Cheese", purchased: false })
  })
});
