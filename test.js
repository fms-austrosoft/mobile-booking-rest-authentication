const auth = require('./index.js');
const userInfo = {
    username: 'xbooking',
    password: 'xb00k1ng',
    key: 'ef93b9e7914c332c26ffcedf284f7b71033192680da36d237103ecbb60418a61c31d250e5deeb7f2be082b4fe79484111ca64e527b397296b1522e2fd2e26f7a'
};

const apiKey = auth.generateApiKey(userInfo.username, userInfo.password, userInfo.key);
console.log('apiKey', apiKey);

const unfolded = auth.unfoldApiKey(apiKey, userInfo.key);
console.log(unfolded);

if (unfolded.fms.username !== userInfo.username) {
    console.error('username mismatch!');
    process.exit();
}
if (unfolded.fms.password !== userInfo.password) {
    console.error('password mismatch!');
    process.exit();
}
console.log('all ok');