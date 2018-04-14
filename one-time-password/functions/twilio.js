const twilio = require('twilio');
const twilioAccount = require('./twilio_account.json');

const accountSid = 'AC26aeee82b65b0d17033b4f8a5771dc69';
const authToken = twilioAccount.twilio_auth_token;

module.exports = new twilio.Twilio(accountSid, authToken);
