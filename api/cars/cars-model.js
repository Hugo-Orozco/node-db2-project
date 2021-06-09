const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
};

const getById = (id) => {
  return db('cars')
    .where({ id })
    .first();
};

const create = (car) => {
  return db('cars')
    .insert(car)
    .then(ids => {
      return getById(ids[0]);
    });
};

const updateById = (id, car) => {
  return db('cars')
    .where({ id })
    .update(car)
    .then(() => {
      const updated = getById(id);
      return updated;
    });
};

const deleteById = (id) => {
  const deleted = getById(id);
  return db('cars')
    .where({ id })
    .del()
    .then(() => {
      return deleted;
    });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
