const markItemAsPurchased = require('./markItemAsPurchased').default;

describe('Mark item as purchased command', () => {
  test('Send data to the API', async () => {
    fetch.mockResponse('', { status: 202 })

    const res = await markItemAsPurchased(5)
    expect(fetch).toHaveBeenCalledWith('/api/items/5/purchased', {
      method: "PUT"
    })
  })
});
