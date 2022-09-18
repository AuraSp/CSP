const logger = require('../logger');


exports.addlog = (req, res) => {
    console.log(req.body)
    try {
        logger.log(req.body);
        res.status(201).json({
            status: 'success',
            data: req.body
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};