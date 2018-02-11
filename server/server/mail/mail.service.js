import nodemailer from 'nodemailer';
import _ from 'lodash';
const Email = require('email-templates');
const path = require('path');

import config from '../../config/config';

const email = new Email({
    views: {
      root: path.resolve(__dirname, `templates`)
    }
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    secureConnection: true,
    port: 465,
    auth: config.mail
});

exports.initMail = function(templateName, recipient, subject, locals, callback) { 

    const cb = callback || _.noop;
    
    return email.render(templateName, locals)
        .then((html) => {

            const mailOptions = {
                from: '"MEGAN Stack"',
                to: recipient,
                subject: subject,
                html: html,
                attachments: (locals.attachments) ? (locals.attachments) : false
            };

            return transporter.sendMail(mailOptions, function(err, info){
  
                if(err){
                  throw err;
                }
        
                console.log('Mail sent: ', subject);
                cb(info.response);
                return;
            });
            
        })
        .catch(console.error);

};