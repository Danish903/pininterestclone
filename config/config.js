// module.exports = {
//         consumerKey: 'GcAxnVYNpiSG1ExXBsRP3QBmp',
//         consumerSecret: 'KcDXTI2twrNJgA1KXffWtPsNB9giARLfyY60WUzEUTpAjlTQNG',
//         mongoURI: 'mongodb://buster:buster@ds153113.mlab.com:53113/favbandpins'
// };

if(process.env.NODE_ENV === 'production') {
        module.exports = require('./prod');
} else {
       module.exports =  require('./dev');
}