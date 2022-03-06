import {
  BadRequestException
} from '@nestjs/common';
import * as EmailValidator from 'email-validator';

export class Validator {

  static checkEmail(email) {
    if (!(EmailValidator.validate(email))) {
      throw new BadRequestException(`The field email is badly formated`);
    }
  }

  static checkUserValidity(user) {
    const requiredFields = ['name', 'lastName', 'email', 'password'];
    const optionalFields = ['age'];

    requiredFields.forEach(field => {
      if (!(field in user)) {
        throw new BadRequestException(`The field ${field} can't be empty`);
      }
      if (!(typeof(user[field]) === 'string')) {
        throw new BadRequestException(`The field ${field} has to be a string`);
      }
      if (field === 'email') {
        Validator.checkEmail(user[field]);
      }
    })

    optionalFields.forEach(field => {
      if (field in user) {
        if (field === 'age' && !(typeof(user[field]) === 'number')) {
          throw new BadRequestException(`The field ${field} has to be a number`);
        }
      }
    })
  }
}
