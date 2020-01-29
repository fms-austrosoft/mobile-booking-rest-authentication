const hash = require('./md');


/**
 * Generates a signature for the given parameters.
 *
 * @param apiVersion API version (e.g.: '1.5')
 * @param apiKey API key ({string}).
 * @param salt Salt ({string}).
 * @param query Query ({string}).
 * @param httpBody HTTP body (as {string}. use JSON.stringify).
 * @param timestamp Timestamp in ms since 1970.
 * @param hashAlgorithm Optional hashing algorithm.
 * @returns {string}
 */
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


// Available functions exported by this JavaScript module
module.exports = {
    signature: signatureFn
};
