const CryptoJS = require('crypto-js');
const axios = require('axios');
function generateTransactionId() {
  const timeStamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000);
  murchantPrefix = 'T';
  const transactionId = `${murchantPrefix}${timeStamp}${randomNumber}`;
  return transactionId;
}

const paymentController = async (req, res) => {
  try {
    const { name, number, amount } = req.body;
    console.log('Request body:', req.body);
    const data = {
      merchantId: 'PGTESTPAYUAT',
      merchantTransactionId: generateTransactionId(),
      merchantUserId: 'MUID123',
      name: name,
      amount: 10000,
      redirectUrl: `https://localhost:8080/api/status`,
      redirectMode: 'POST',
      // "callbackUrl": "https://webhook.site/callback-url",
      mobileNumber: number,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };
    // Convert data to base64
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');

    // Generate checksum
    const keyIndex = 1;
    const salt_key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
    const stringToHash = `${payloadMain}/pg/v1/pay${salt_key}`;
    const sha256 = CryptoJS.SHA256(stringToHash).toString(CryptoJS.enc.Hex); // Correct way to use crypto-js for SHA256
    const checksum = `${sha256}###${keyIndex}`;

    // Define the production URL
    // const prod_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

    // Set up the request options
    const options = {
      method: 'POST',
      url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    console.log('Axios Options:', options);

    axios
      .request(options)
      .then(function (response) {
        return res
          .status(200)
          .send(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    // Enhanced error logging
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    } else {
      console.error('Error message:', error.message);
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { paymentController };
