### Mail Dawg 🐶
<p>is a simple service for sending emails from your app. Primarily intended for sending welcome emails, alerts, password reset, verify account emails etc.</p>
<p>Comes with a really simple responsive HTML email template.</p> 


#### Endpoints
##### send
This function is for sending emails. 
Params:
1. type - type of email template (welcome, reset, alert)
2. to - email address of the receiver 
3. subject - subject of the email
4. data - object containing additional context info for the templates. Eg - field `reset_url` for `reset` email template

##### test
Use it for testing your emails. Send an email using the test account (created on the fly) just as you would with any other SMTP provider and preview the sent message here as no emails are actually delivered. Useful for debugging. 

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

