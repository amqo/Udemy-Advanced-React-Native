const admin = require('firebase-admin');

module.exports = function(req, res) {
  // Verify the user provided a phone and a code number
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided' });
  }

  // Format the phone number to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  // Parse code to be sure it's an integer
  const code = parseInt(req.body.code);

  return admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref('users/' + phone);
      return ref.on('value', snapshot => {
        // Stop listening for more value changes
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid' });
        }

        // If the user sent the valid codeValid
        ref.update({ codeValid: false });
        return admin.auth().createCustomToken(phone)
          .then(token => res.send({ token }));
      });
    })
    .catch(error => res.status(422).send({ error }));
}
