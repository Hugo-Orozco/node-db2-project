const cars = require('./cars-model');
const db = require('../../data/db-config');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  cars.getById(id)
    .then(data => {
      if (!data) {
        next({ status: 404, message: `car with id ${id} is not found` });
      }
      else {
        req.car = data;
        next();
      }
    })
    .catch(err => {
      next(err);
    });
};

const checkCarPayload = (req, res, next) => {
  const { body } = req;
  if (body.vin === undefined) {
    next({ status: 400, message: 'vin is missing' });
  }
  else if (body.make === undefined) {
    next({ status: 400, message: 'make is missing' });
  }
  else if (body.model === undefined) {
    next({ status: 400, message: 'model is missing' });
  }
  else if (body.mileage === undefined) {
    next({ status: 400, message: 'mileage is missing' });
  }
  else {
    req.body = body;
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const { body } = req;
  const isValidVin = vinValidator.validate(body.vin);
  if (!isValidVin) {
    next({ status: 400, message: `vin ${body.vin} is invalid` });
  }
  else {
    req.body = body;
    next();
  }
};

const checkVinNumberUnique = (req, res, next) => {
  const { body } = req;
  return db('cars')
    .where({ vin: body.vin })
    .first()
    .then(data => {
      if (data) {
        next({ status: 400, message: `vin ${body.vin} already exists` });
      }
      else {
        req.body = body;
        next();
      }
    });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};
