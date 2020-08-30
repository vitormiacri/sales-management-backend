import User from '../../Models/User';

class UpdateUserService {
  async run({ user, sessionUserId }) {
    const { email } = user;
    const sessionUser = await User.findByPk(sessionUserId);

    if (email !== sessionUser.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        throw new Error('Usuário já existe');
      }
    }
    const { id, name } = await user.update(user);

    return {
      id,
      name,
      email,
    };
  }
}

export default new UpdateUserService();
