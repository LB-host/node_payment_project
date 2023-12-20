const paymentModel = require('../models/payment.model');
const bcrypt = require('bcrypt');

exports.processPayment = async (req, res) => {
  try {
    const { cardNumber, cvv, cardHolderName, expirationDate } = req.body;

    if (!isValidLuhnAlgorithm(cardNumber)) {
        return res.status(400).json({ error: 'Invalid card number. Please enter a valid credit card number.' });
      }

    const encryptedCardNumber =  await encrypt(cardNumber);
    const encryptedCVV = await encrypt(cvv);

    await paymentModel.savePayment({
      cardNumber: encryptedCardNumber,
      cvv: encryptedCVV,
      cardHolderName,
      expirationDate,
    });

    res.status(200).json({ message: 'Payment processed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function isValidLuhnAlgorithm(cardNumber) {
    let sum = 0;
    let doubleDigit = false;
  
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
  
      if (doubleDigit) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      doubleDigit = !doubleDigit;
    }
    return sum % 10 === 0;
  }


async function encrypt(data) {
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(data, saltRounds);
    return hash;
  } catch (error) {
    throw new Error('Error encrypting data');
  }
}
