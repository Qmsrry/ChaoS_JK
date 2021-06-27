const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const {stmp} = require('../../.config.js');
module.exports = function () {
    const transport = nodemailer.createTransport(smtpTransport(stmp));
    return transport;
}
