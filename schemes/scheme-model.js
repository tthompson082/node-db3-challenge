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
    .first()
    .then(scheme => (scheme ? scheme : null));
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
  return db
    .insert(data)
    .into('schemes')
    .then(id => findById(id[0]));
}

function update(changes, id) {
  return db
    .select('*')
    .from('schemes')
    .where('id', '=', id)
    .update(changes)
    .then(updated => findById(id));
}

function remove(id) {
  return db
    .select('*')
    .from('schemes')
    .where('id', '=', id)
    .del()
    .then(count => (count > 0 ? count : null));
}
