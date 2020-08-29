import User from '../../Models/User';

class CreateUserService {
  async run({ user }) {
    const userExists = await User.findOne({ where: { email: user.email } });

    if (userExists) {
      throw new Error('Este usuário já existe!');
    }

    const { id, name, email } = await User.create(user);

    return {
      id,
      name,
      email,
    };
  }
}

export default new CreateUserService();
