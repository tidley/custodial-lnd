const cryptojs = require('crypto-js');

const InvoiceFuns = {
  keysendFields: () => {
    let preimage = cryptojs.lib.WordArray.random(32);
    const payment_hash = cryptojs.enc.Base64.stringify(cryptojs.SHA256(preimage));
    preimage = cryptojs.enc.Base64.stringify(preimage);
    return { preimage: preimage, payment_hash: payment_hash };
  },
  invoiceData: (args) => {
    return {
      dest_string: args.recipient,
      payment_hash: args.payment_hash,
      amt: args.amount,
      final_cltv_delta: 40,
      dest_custom_records: { 5482373484: args.preimage }
    }
  }
}

module.exports = InvoiceFuns;