import { subMonths, endOfDay, format, addMonths } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { Op, Sequelize } from 'sequelize';
import Order from '../../Models/Order';

class MonthCountGraph {
  async run() {
    const today = new Date();
    const orders = await Order.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'quantity'],
        [
          Sequelize.fn('date_trunc', 'month', Sequelize.col('created_at')),
          'createdOn',
        ],
      ],
      where: {
        createdAt: {
          [Op.between]: [subMonths(today, 6), endOfDay(today)],
        },
      },
      order: [[Sequelize.literal('"createdOn"'), 'ASC']],
      group: ['createdOn'],
    });

    const result = orders.map(item => {
      const { quantity, createdOn } = item.get();
      return {
        quantidade: quantity,
        date: format(addMonths(createdOn, 1), 'MMMM', {
          locale: ptBr,
        }),
      };
    });

    return result;
  }
}

export default new MonthCountGraph();
