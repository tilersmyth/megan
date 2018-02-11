'use strict';

import { initMail } from '../../mail.service';

exports.sendMail = (recipient, locals, callback) => {

   return initMail('confirm-account/html.pug', recipient, 'Welcome to MEGAN Stack', locals, callback);

}