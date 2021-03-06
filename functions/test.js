
const nodemailer = require('nodemailer');
const swig = require('swig');
const juice = require('juice');
const htmlToText = require('html-to-text');

/**
* A test mail function
* @bg params
* @param {string} type of mail to be sent
* @param {string} to recepient address
* @param {string} subject of the mail
* @param {object} data mail data options
* @returns {string}
*/
module.exports = (type = "welcome", to, subject, data={}, context, callback) => {
	console.log(data);
    console.log("##########");
    console.log(context.params);
    let tmplpath = __dirname + '/../tmpl/';
    if (type === "reset") {
        tmplpath = tmplpath + 'reset.html';
    } else if (type === 'welcome') {
        tmplpath = tmplpath + 'welcome.html';
    } else if (type === "alert") {
    	tmplpath = tmplpath + 'alert.html';
    } else {
    	return callback(new Error("Choose a valid email template"));
    }

    var htmlOutput = swig.renderFile(tmplpath, { data });
    var mailtext = htmlToText.fromString(htmlOutput, { wordwrap: 130 });
    var inlinedHTML = juice(htmlOutput);

	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	nodemailer.createTestAccount((err, account) => {

	    // create reusable transporter object using the default SMTP transport
	    let transporter = nodemailer.createTransport({
	        host: 'smtp.ethereal.email',
	        port: 587,
	        secure: false, // true for 465, false for other ports
	        auth: {
	            user: account.user, // generated ethereal user
	            pass: account.pass  // generated ethereal password
	        }
	    });

	    // setup email data with unicode symbols
	    let mailOptions = {
	        from: '"Shiv from Acme" <shiv@posted.news>', // sender address
	        to: to, // list of receivers seperated by comma
	        subject: subject, // Subject line
	        text: mailtext, // plain text body
	        html: inlinedHTML // html body
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
	});
  	

};
