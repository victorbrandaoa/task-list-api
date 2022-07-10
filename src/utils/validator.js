import {
  BadRequestException
} from '@nestjs/common';
import entitiesFormat from './constants';

export class Validator {
  static checkObjectFormat(type, obj) {
    const objFormat = entitiesFormat[type];
    this.checkFields(obj, objFormat.requiredFields);
    this.checkFields(obj, objFormat.optionalFields, true);

    const requiredFields = Object.keys(objFormat.requiredFields);
    const optionalFields = Object.keys(objFormat.optionalFields);
    const expectedFields = requiredFields.concat(optionalFields);

    const receivedFields = Object.keys(obj);

    const diff = receivedFields.filter(field => !expectedFields.includes(field));
    if (diff.length > 0) {
      throw new BadRequestException(`${type} does not have the following fields: ${diff}`);
    }
  }

  static checkFields(obj, fields, optional=false) {
    for (const [field, fieldType] of Object.entries(fields)) {
      if (!optional && !(field in obj)) {
        throw new BadRequestException(`The field ${field} can't be empty`);
      }

      if (obj[field] && typeof(obj[field]) !== fieldType) {
        throw new BadRequestException(`The field ${field} has to be ${fieldType}`);
      }
    }
  }

  static checkUserValidity(user) {
    this.checkObjectFormat('user', user);
  }

  static checkCategoryValidity(category) {
    this.checkObjectFormat('category', category);
  }
}
