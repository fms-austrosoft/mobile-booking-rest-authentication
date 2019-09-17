const fms = require('./authentication/fms');

module.exports = {
    salt: fms.salt,
    signature: fms.signature,
    generateApiKey: fms.generateApiKey,
    unfoldApiKey: fms.unfoldApiKey
};
