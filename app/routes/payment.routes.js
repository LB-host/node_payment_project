module.exports = app => {
    const paymentController = require('../controllers/payment.controller');

    app.post('/process', paymentController.processPayment);

}

