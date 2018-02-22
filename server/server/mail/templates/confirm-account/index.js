import { initMail } from '../../mail.service';

exports.sendMail = (recipient, locals, callback) => (
  initMail('confirm-account/html.pug', recipient, 'Welcome to MEGAN Stack', locals, callback)
);
