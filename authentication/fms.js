const aes = require('./aes');
const hash = require('./md');
const forge = require('node-forge');


const preparePassphrase = function (passphrase) {
    return forge.pkcs5.pbkdf2(passphrase, '', 751, 32);
};

const saltFn = function (apiKey, key, hashAlgorithm = hash.sha256) {
    return hashAlgorithm(apiKey + '::' + preparePassphrase(key));
};

const signatureFn = function (apiVersion, apiKey, salt, query, httpBody = '', timestamp = Date.now(), hashAlgorithm = hash.sha256) {
    const separator = '::';
    const concat =
        apiKey + separator +
        salt + separator +
        httpBody + separator +
        query + separator +
        timestamp + separator;

    const hash = hashAlgorithm(concat);
    return apiVersion + ':' + hash;
};

const generateApiKeyFn = function (username, password, key, hashAlgorithm = hash.sha256) {
    const separator = '::';
    const concat =
        username + separator +
        password + separator +
        hashAlgorithm(key);

    const apiKey = aes.encrypt(concat, preparePassphrase(key));
    const byteArray = new Uint8Array(apiKey.length);
    for (let i = 0; i < apiKey.length; i++) {
        byteArray[i] = apiKey.charCodeAt(i);
    }
    return Buffer.from(byteArray).toString('base64');
};

const unfoldApiKeyFn = function (apiKey, key) {
    const plainApiKey = Buffer.from(apiKey, 'base64');
    const decrypted = aes.decrypt(plainApiKey, preparePassphrase(key));
    const split = decrypted.split('::');

    return {
        fms: {
            username: split[0],
            password: split[1]
        },
        salt: split[2]
    };
};


module.exports = {
    salt: saltFn,
    signature: signatureFn,
    generateApiKey: generateApiKeyFn,
    unfoldApiKey: unfoldApiKeyFn
};
