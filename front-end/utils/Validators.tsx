import isEmail from 'validator/lib/isEmail';

export function validateEmail(email: string) {
    if(isEmail(email)) {  
      return true;
    }
    else {
      return false;
    }
  }

  export function validatePassword(pass1: string , pass2: string) {
    if(pass1 == pass2) {  
      return true;
    }
    else {
      return false;
    }
  }