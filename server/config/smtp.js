const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const {smtp} = require('../../.config.js');
module.exports = function () {
    const transport = nodemailer.createTransport(smtpTransport(smtp));
    return transport;
}
