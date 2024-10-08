const CryptoJS = require('crypto-js')
require('dotenv').config();

const secretToken = process.env.JWT_TOKEN;

function guid() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 32; i++) {
    const randomValue = CryptoJS.lib.WordArray.random(1).words[0]
    text += possible.charAt(Math.floor((randomValue / 0xffffffff) * possible.length))
  }

  return text
}

function encryptPayload(payload) {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), secretToken).toString()
  return encrypted
}

function decryptPayload(encryptedPayload) {
  const bytes = CryptoJS.AES.decrypt(encryptedPayload, secretToken);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  if (!decrypted) {
      throw new Error('Decryption failed');
  }
  return JSON.parse(decrypted); 
}


module.exports = {
  encryptPayload,
  decryptPayload
}
