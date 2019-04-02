const knex = require('../knexClient');

module.exports = () => knex('items')
  .select('id', 'name', 'purchased')
  .then(items => items.map(item => ({
    ...item,
    purchased: item.purchased === 1
  })))
