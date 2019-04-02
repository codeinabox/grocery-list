const knex = require('../knexClient');

module.exports = name => knex('items')
  .insert({ name })
  .returning('id')
  .then(ids => ({
    id: ids[0],
    name,
    purchased: false
  }))
