import { subMonths, endOfDay, format, addMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Op, Sequelize } from 'sequelize';
import Order from '../../Models/Order';

class MonthValueGraph {
  async run() {
    const today = new Date();
    const orders = await Order.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('total_value')), 'amount'],
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

    const result = {
      id: 'Valores Mensais',
      color: '#000',
      data: orders.map(item => {
        const { amount, createdOn } = item.get();
        return {
          y: amount,
          x: format(addMonths(createdOn, 1), 'MMMM', {
            locale: ptBR,
          }),
        };
      }),
    };
    return [result];
  }
}

export default new MonthValueGraph();
