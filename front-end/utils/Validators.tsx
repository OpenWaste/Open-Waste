import isEmail from 'validator/lib/isEmail';

export function validateEmail(email: string) {
    if(isEmail(email)) {  
      return true;
    }
    else {
      return false;
    }
  }