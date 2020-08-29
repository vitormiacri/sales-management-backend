import User from '../../Models/User';

class DeleteUserService {
  async run({ userId }) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    await user.destroy();

    return true;
  }
}

export default new DeleteUserService();
