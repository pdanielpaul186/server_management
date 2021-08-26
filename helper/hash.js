const md5 = require('md5');

function hash(stringValue){
    let hashedValue = md5(stringValue);
    return hashedValue;
}

module.exports = {
    hash : hash
}