### Mail Dawg 🐶
<p>is a simple service for sending emails from your app. Primarily intended for sending welcome emails, alerts, password reset, verify account emails etc.</p>
<p>Comes with a really simple responsive and inlined HTML email template.</p>
 
#### Getting Started
<p>
  To use the mail dawg service for your own app, simply create a service from the source to your stdlib account.</p><p> Its super simple to run the service as a bg worker with Stdlib - just append `:bg` to the `send` endpoint.
</p>
[Fork Source](https://stdlib.com/@shivkanthb/src/maildawg/)

#### Usage
Feel free to modify the templates (inside `tmpl`) as you wish. 
1. Call the service from your app
```
const lib = require('lib')

let mail_data = {
  to: "bob@gmail.com",
  type: "reset",
  subject: "Password reset",
  data: {
    reset_url: "your-url-with-token"
  }
}
lib({bg: true}).username.maildawg.send(mail_data, (err, response) => {});
```

2. Access service over http
```
https://username.lib.id/maildawg/send/:bg
```
 
#### Change Log
0.0.2 - Latest

#### Thanks
[Stdlib](https://stdlib.com), [Node Mailer](https://nodemailer.com/), [Ethereal Mail](https://ethereal.email/), [Response HTML Email](https://github.com/leemunroe/responsive-html-email-template)

