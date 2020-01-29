const auth = require('./index.js');
const userInfo = {
    username: 'mbooking',
    password: 'mbooking#1',
    key: 'ef93b9e7914c332c26ffcedf284f7b71033192680da36d237103ecbb60418a61c31d250e5deeb7f2be082b4fe79484111ca64e527b397296b1522e2fd2e26f7a'
};

const signature = auth.signature('1.5', userInfo.key, 'x883', '/api/ping', '', 33);
if (signature !== '1.5:c973090ca6115c804170532333952879f3588e115c21d9fd775bc4e8bf5c54cd') {
    console.log("wrong signature");
    process.exit();
}

console.log('all ok');
