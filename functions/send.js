
const nodemailer = require('nodemailer');
const swig = require('swig');
const juice = require('juice');

/**
* A send function
* @bg empty
* @param {string} type of mail to be sent
* @param {string} to recepient address
* @param {string} subject of the mail
* @param {object} data mail data options
* @returns {string}
*/
module.exports = (type = "test", to, subject, data={}, context, callback) => {

    let tmplpath = __dirname + '/../tmpl/';
    if (type === "reset") {
        tmplpath = tmplpath + 'reset.html';
    }

    var htmlOutput = swig.renderFile(tmplpath, {});
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
        from: '"Shiv" <shiv@posted.news>', // sender address
        to: to, 
        subject: subject, 
        text: 'Hello world?', 
        html: inlinedHTML // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message sent: %s', info.messageId);
	    callback(null, `Send mail call done`);
    });
};
