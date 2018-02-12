'use strict';

import { initMail } from '../../mail.service';

exports.sendMail = (recipient, locals, callback) => {

   return initMail('forgot-password/html.pug', recipient, 'MEGAN Stack - forgot password', locals, callback);

}