const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const config = require('./config.js');
module.exports = function () {
    const transport = nodemailer.createTransport(smtpTransport(config.stmp));
    return transport;
}
