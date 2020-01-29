# fms Mobile Booking REST Authentication
This library provides the most important functionalities for generating the following REST-API properties exported as JavaScript and node modules:
* **Signature** - created from the URL, HTTP body and other properties

The installation corresponds to an npm install targeting the GIT-repository:
```text
npm install git+https://github.com/fms-austrosoft/mobile-booking-rest-authentication.git
```

## Usage
The functions are imported as JavaScript modules as the following example shows:
```javascript
const authentication = require('fms-rest-authentication');
const signature = authentication.signature('1.5', 'GFJ73JD#3', 'x883', '/api/ping');
console.log(signature);
```

## Functions
The following function is provided by the base module:
```javascript
const signature = function (apiVersion, apiKey, salt, query, httpBody, timestamp, hashAlgorithm);
```

### Signature
A signatures takes all possible input parameters to generate a unique identifier. The following function signature is used:
```javascript
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
(the hashing algorithm defaults to SHA-256 which is the standard for signature generation)
