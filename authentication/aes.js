const forge = require('node-forge');


const decryptFn = function (data, key) {
    const iv = forge.random.getBytesSync(32);
    const bufferData = forge.util.createBuffer(data);

    const decipher = forge.cipher.createDecipher('AES-ECB', key);
    decipher.start({iv: iv});
    decipher.update(bufferData);

    if (!decipher.finish()) {
        throw 'Unable to decrypt data';
    }
    return decipher.output.data;
};

const encryptFn = function (data, key) {
    const iv = forge.random.getBytesSync(32);
    const bufferData = forge.util.createBuffer(data);

    const cipher = forge.cipher.createCipher('AES-ECB', key);
    cipher.start({iv: iv});
    cipher.update(bufferData);

    if (!cipher.finish()) {
        throw 'Unable to encrypt data';
    }
    return cipher.output.data;
};


module.exports = {
    decrypt: decryptFn,
    encrypt: encryptFn
};
