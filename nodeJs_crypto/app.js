// Constants
const dotenv = require('dotenv');
dotenv.config();
const DOTENV = process.env;
const axios = require('axios');
const https = require('https');
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Libraries
const InvoiceFuns = require('./invoice_funs.js')

async function main() {
  // Create entropy for keysend tx
  const keysendFields = InvoiceFuns.keysendFields();

  // Send invoice to rest API

  const headers = {
    'Grpc-Metadata-macaroon': DOTENV.MAC_ADMIN,
    'Access-Control-Allow-Origin': DOTENV.ENDPOINT,
  };

  const dataArgs = {
    recipient: "pubkey",
    payment_hash: keysendFields.payment_hash,
    amount: 100,
    preimage: keysendFields.preimage
  }

  const data = InvoiceFuns.invoiceData(dataArgs);

  const options = {
    method: 'POST',
    url: DOTENV.ENDPOINT + DOTENV.LND_API + DOTENV.SUBMIT_INVOICE,
    httpsAgent: agent,
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(options);
    const responseOk =
      response && response.status === 200 && response.statusText === 'OK';
    if (responseOk) {
      await response.data;
      console.log(response.data);
      //   return response.data;
    } else {
      console.log('Invoice payment error');
    }
  } catch (error) {
    console.log(error.response);
  }
}

main();