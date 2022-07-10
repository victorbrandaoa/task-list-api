export class Formatter {
  static formatUser(user) {
    const { password, _id, __v, ...userToReturn } = user._doc;
    return userToReturn;
  }

  static formatCategory(category) {
    const { _id, __v, ...categoryToReturn } = category._doc;
    return categoryToReturn;
  }
}
