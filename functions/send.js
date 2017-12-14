
let nodemailer = require('nodemailer');

/**
* A send function
* @bg info
* @param {string} type of mail to be sent
* @param {string} to recepient address
* @returns {string}
*/

module.exports = (type = "test", to, context, callback) => {

	let transporter = nodemailer.createTransport({
		service: process.env.mail_source,
        host: process.env.mail_host,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.mail_user, // generated ethereal user
            pass: process.env.mail_pass  // generated ethereal password
        }
    });
	
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Shiv" <shiv@posted.news>', // sender address
        to: , // list of receivers
        subject: 'Hello Test from maildawg', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world bruh </b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message sent: %s', info.messageId);
	    // Preview only available when sending through an Ethereal account
	    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
	    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	    callback(null, `Send mail call done`);
    });
};
