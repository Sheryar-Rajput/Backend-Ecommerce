const generator = require('generate-password');

module.exports.passGenerator = (length = 12)=>{
    const pass = generator.generate({
        length: length,
        numbers: true
    });
    return pass;
}