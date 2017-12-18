
const nodemailer = require('nodemailer');
const swig = require('swig');
const juice = require('juice');
const htmlToText = require('html-to-text');

/**
* A send function
* @bg params
* @param {string} type of mail to be sent
* @param {string} to recepient address
* @param {string} subject of the mail
* @param {object} data mail data options
* @returns {string}
*/
module.exports = (type = "welcome", to, subject, data={}, context, callback) => {

    let tmplpath = __dirname + '/../tmpl/';
    if (type === "reset") {
        tmplpath = tmplpath + 'reset.html';
    } else if (type === "welcome") {
        tmplpath = tmplpath + 'welcome.html';
    } else if (type === "alert") {
        tmplpath = tmplpath + 'alert.html';
    } else {
        callback(new Error("Choose a valid email template"));
    }

    var htmlOutput = swig.renderFile(tmplpath, { data });
    var mailtext = htmlToText.fromString(htmlOutput, { wordwrap: 130 }); // For browsers/settings that doesn't support HTML mails
    var inlinedHTML = juice(htmlOutput);

	let transporter = nodemailer.createTransport({
		service: process.env.mail_source,
        host: process.env.mail_host,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.mail_user, 
            pass: process.env.mail_pass 
        }
    });
	
    let mailOptions = {
        from: '"Shiv from Acme" <shiv@posted.news>', // sender address
        to: to, 
        subject: subject, 
        text: mailtext, 
        html: inlinedHTML // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message sent: %s', info.messageId);
	    callback(null, `Send mail call complete`);
    });
};
