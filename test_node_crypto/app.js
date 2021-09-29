const cryptojs = require('crypto-js');

let preimage = cryptojs.lib.WordArray.random(32);

console.log('preimage', preimage.toString());

let payment_hash = cryptojs.enc.Base64.stringify(cryptojs.SHA256(preimage));

console.log('payment_hash', payment_hash)

payment_hash = cryptojs.enc.Base64.stringify(cryptojs.SHA256(preimage.toString()));

console.log('payment_hash', payment_hash)

preimage = cryptojs.enc.Base64.stringify(preimage);

console.log('preimage', preimage);