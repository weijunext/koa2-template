const CryptoJS = require('crypto-js');

exports.encrypt = (word, keyStr) => {
  // keyStr = keyStr ? keyStr : mtKey; // 如果有默认值，先在config里配置好再在这里引用
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  var hexStr = encrypted.ciphertext.toString().toUpperCase();
  return hexStr;
}

exports.decrypt = (word, keyStr) => {
  // keyStr = keyStr ? keyStr : mtKey; // 如果有默认值，先在config里配置好再在这里引用
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);

  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
