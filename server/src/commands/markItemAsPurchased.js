const knex = require('../knexClient');

module.exports = id => knex('items')
  .where('id', '=', id)
  .update({ purchased: 1 });
