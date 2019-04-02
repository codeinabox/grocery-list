export default () => fetch('/api/items')
  .then(res => res.json())

