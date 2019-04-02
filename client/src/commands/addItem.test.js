const addItem = require('./addItem').default;

describe('Add item command', () => {
  test('Send data to the API', async () => {
    fetch.mockResponse(JSON.stringify(
      { id: 5, name: "Salad", purchased: false }
    ))

    const res = await addItem("Salad")
    expect(fetch).toHaveBeenCalledWith('/api/items', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Salad" })
    })
    expect(res).toEqual({ id: 5, name: "Salad", purchased: false })
  })
});
