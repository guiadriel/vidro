// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC06dbd2372bfc8af11ee77f74af27881f';
const authToken = 'cf631e80b6a329614323fd0d79b04972';

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
        from: 'whatsapp:+14155238886',
        body: `It's taco time!`,
        to: 'whatsapp:+5519997218913'
    })
    .then(message => console.log(message.sid));