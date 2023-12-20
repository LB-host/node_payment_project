const pool = require('./db');

const PaymentModel = {
    savePayment: async (encryptedCardNumber, encryptedCVV, cardHolderName, expirationDate) => {
    const query = `
      INSERT INTO "SCHEMA_PORTAL".payments
      ("card_number", "cvv", "card_holder_name", "expiration_date")
      VALUES ($1, $2, $3, $4)
    `;

    const values = [encryptedCardNumber, encryptedCVV, cardHolderName, expirationDate];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = PaymentModel;
