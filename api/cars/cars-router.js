const router = require('express').Router();

const cars = require('./cars-model');

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

router.get('/', (req, res, next) => {
    cars.getAll()
        .then(data => {
            res.json(data);
        });
});

router.get('/:id', checkCarId, (req, res, next) => {
    const { car } = req;
    res.json(car);
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    const { body } = req;
    cars.create(body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err);
        });
});

router.put('/:id', checkCarId, checkCarPayload, checkVinNumberValid, (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    cars.updateById(id, body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/:id', checkCarId, (req, res, next) => {
    const { id } = req.params;
    cars.deleteById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err);
        });
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    });
});

module.exports = router;
