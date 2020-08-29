import User from '../../Models/User';

class CreateSessionService {
  async run({ email, password }) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (!(await user.checkPassword(password))) {
      throw new Error('E-mail ou senha não confere.');
    }

    return user;
  }
}

export default new CreateSessionService();
