const entitiesFormat = {
  'user': {
    'requiredFields': {
      'username': 'string',
      'password': 'string'
    },
    'optionalFields': {
      'age': 'number'
    }
  },
  'category': {
    'requiredFields': {
      'name': 'string'
    },
    'optionalFields': {
      'description': 'string'
    }
  }
}

export default entitiesFormat;
