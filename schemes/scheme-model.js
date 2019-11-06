const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db.select('*').from('schemes');
}

function findById(id) {
  return db
    .select('*')
    .from('schemes')
    .where('id', '=', id)
    .first();
}

function findSteps(id) {
  return db
    .select('T.id', 'T.step_number', 'T.instructions', 'S.scheme_name')
    .from('steps as T')
    .join('schemes as S', 'T.scheme_id', '=', 'S.id')
    .where('S.id', '=', id)
    .orderBy('T.step_number');
}

function add(data) {
  return db.insert(data).into('schemes');
}

function update(changes, id) {
  return db
    .select('*')
    .from('schemes')
    .where('id', '=', id)
    .update(changes);
}

function remove(id) {
  return db
    .select('*')
    .from('schemes')
    .where('id', '=', id)
    .del();
}
