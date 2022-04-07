export class Formatter {
  static formatUser(user) {
    const { password, _id, __v, ...userToReturn } = user._doc;
    return userToReturn;
  }
}
