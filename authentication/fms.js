const hash = require('./md');


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


module.exports = {
    signature: signatureFn
};
