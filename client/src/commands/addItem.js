export default name => fetch('/api/items', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name })
}).then(res => res.json())


