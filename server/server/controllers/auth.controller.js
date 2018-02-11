import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import mail from '../mail';

const login = async (params, config) => {
  
  const user = await User.findOne({ email: params.email });

  if (!user) {
    throw new Error('No user associated with specified email address');
  }

  const valid = await bcrypt.compare(params.password, user.password);
  if (!valid) {
    throw new Error('The password entered is not correct');
  }

  // Account not activated
  if(!user.active){

    return { auth: false, user: null, token: null };

  }

  const token = jwt.sign(
    {
      _id: user._id
    },
    config.secrets.jwt,
    {
      expiresIn: '1y',
    },
  );
  
  return { auth: true, user: user, token: token };

}

const register = async (params, config) => {

  const newUser = params.data;

  const existingUser = await User.findOne({ email: newUser.email });

  if (existingUser) {
    throw new Error('The specified email address is already in use');
  }

  newUser.password = await bcrypt.hash(newUser.password, 12);

  const user = await new User(newUser).save();

  if(!user){
    throw new Error('Error saving new user');
  }

  const confirmToken = jwt.sign(
    {
      _id: user._id
    },
    config.secrets.confirm,
    {
      expiresIn: '1h',
    },
  );

  // New account confirmation required
  if(!user.active){

    mail.confirmAccount.sendMail(
      newUser.email, 
      {name: newUser.first_name, link: config.domain + 'confirm/' + confirmToken}
    );

    return { auth: false, user: null, token: null };

  }

  const token = jwt.sign(
    {
      _id: user._id
    },
    config.secrets.jwt,
    {
      expiresIn: '1y',
    },
  );

  return { auth: true, user: user, token: token };

}

const confirm = async (params, config) => {

  return jwt.verify(params.token, config.secrets.confirm, function(err, decoded) {

    // Token expired or malformed
    if(err){
      return err;
    }

    return User.findOneAndUpdate({_id: decoded._id}, {$set:{active: true}}, '-password').exec()
      .then((user) => {
        
        const token = jwt.sign(
          {
            _id: user._id
          },
          config.secrets.jwt,
          {
            expiresIn: '1y',
          },
        );
      
        return { auth: true, user: user, token: token };

      })
      .catch((err) => {
        console.log(err);
      });

  });

}

export default { login, register, confirm };
