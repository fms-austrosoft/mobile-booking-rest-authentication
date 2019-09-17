# fms REST Authentication Library
This library provides the most important functionalities for generating the following REST-API properties exported as JavaScript and node modules:
* **Salt** - generated from API Key and passphrase
* **Signature** - created from the URL, HTTP body and other properties
* **API Key** - a globally valid API Key using username, password and a passphrase

## Import the Library

## Functions
The following functions are provided by the base module:
```javascript 1.8
const salt = function (apiKey, key, hashAlgorithm);
const signature = function (apiVersion, apiKey, salt, query, httpBody, timestamp, hashAlgorithm);
const generateApiKey = function (username, password, key, hashAlgorithm);
const unfoldApiKey = function (apiKey, key);
```

### Salt
Salts are generated using the public API key and the private passphrase which is only known by the server. The function interface looks like the following:
```javascript 1.8
// Function parameter signature:
//   apiKey: string
//   passphrase: string
//   hashAlgorithm: (data) => string
// returns: string
const saltFn = function (apiKey, passphrase, hashAlgorithm = hash.sha256)

// Example
const apiKey = '...';
const passphrase = '...';
restAuthentication.salt(apiKey, passphrase);
```
The hash algorithm defaults to SHA-256 if none is provided explicitly.

### Signature
A signatures takes all possible input parameters to generate a unique identifier. The following function signature is used:
```javascript 1.8
// Function parameter signature:
//   apiVersion: string
//   apiKey: string
//   salt: string
//   query: string
//   httpBody: string
//   timestamp: number
//   hashAlgorithm: (data) => string
// returns: string
const signatureFn = function (apiVersion, apiKey, salt, query, httpBody = '', timestamp = Date.now(), hashAlgorithm = hash.sha256)
```

### Generate an API Key
API key are generated using any username, password and passphrase. The passphrase (private key) length does not matter for the encryption process of the key. The encryption process is based on AES and allows fast and simple synchronous decryption and encryption. The key is returned as base64 encoding.
```javascript 1.8
// Function parameter signature:
//   username: string
//   password: string
//   key: string
//   hashAlgorithm: (data) => string
// returns: string
const generateApiKey = function (username, password, key, hashAlgorithm = hash.sha256)
```

### Unfold an API Key
An API key is simply synchronously encrypted data. That means, given the API key and the passphrase (private key), the API key can be unfolded and deciphered.
```javascript 1.8
// Function parameter signature:
//   apiKey: string
//   key: string
// returns: object
const unfoldApiKey = function (apiKey, key)
```
The returned object contains all separate parts of the API key and has the following structure:
```json
{
   "fms": {
       "username": "...",
       "password": "..."
   },
   "salt": "..."
}
```