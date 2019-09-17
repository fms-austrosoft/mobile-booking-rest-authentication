const forge = require('node-forge');


const generateHash = function (data, messageDigest) {
    messageDigest.update(data);
    return messageDigest.digest().toHex();
};


module.exports = {
    sha1: (data) => generateHash(data, forge.md.sha1.create()),
    sha256: (data) => generateHash(data, forge.md.sha256.create()),
    sha384: (data) => generateHash(data, forge.md.sha384.create()),
    sha512: (data) => generateHash(data, forge.md.sha512.create()),
    md5: (data) => generateHash(data, forge.md.md5.create())
};
