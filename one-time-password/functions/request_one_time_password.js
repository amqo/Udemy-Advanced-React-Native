const admin = require('firebase-admin');
const twilio = require('./twilio');
const twilioAccount = require('./twilio_account.json');

module.exports = function(req, res) {
  // Verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  // Format the phone number to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);
      return twilio.messages.create({
        body: 'Your code is ' + code,
        to: phone,
        from: twilioAccount.twilio_from_number
      }, (error) => {
        if (error) { return res.status(422).send({ error }); }

        // Create a record in Firebase Database
        admin.database().ref('users/' + phone)
          .update({ code: code, codeValid: true }, () => {
            res.send({ success: true });
          });
      });
    })
    .catch(error => res.status(422).send({ error }));
}
