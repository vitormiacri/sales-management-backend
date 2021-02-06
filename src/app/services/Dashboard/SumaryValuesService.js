import { startOfDay, endOfDay, startOfWeek, startOfMonth } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../../Models/Order';

class SumaryValuesService {
  async run() {
    const today = new Date();
    const todayValue = await this.todayOrdersValue(today);
    const weekValue = await this.weeklyOrdersValue(today);
    const monthValue = await this.monthOrdersValue(today);
    const monthAmount = await this.monthOrdersAmount(today);

    return {
      todayValue,
      weekValue,
      monthValue,
      monthAmount,
    };
  }

  async todayOrdersValue(today) {
    try {
      const value = await Order.sum('total_value', {
        where: {
          createdAt: {
            [Op.between]: [startOfDay(today), endOfDay(today)],
          },
        },
      });

      return value;
    } catch (err) {
      return err.message;
    }
  }

  async weeklyOrdersValue(today) {
    try {
      const value = await Order.sum('total_value', {
        where: {
          createdAt: {
            [Op.between]: [
              startOfWeek(today, {
                weekStartsOn: 1,
              }),
              endOfDay(today),
            ],
          },
        },
      });

      return value;
    } catch (err) {
      return err.message;
    }
  }

  async monthOrdersValue(today) {
    try {
      const value = await Order.sum('total_value', {
        where: {
          createdAt: {
            [Op.between]: [startOfMonth(today), endOfDay(today)],
          },
        },
      });

      return value;
    } catch (err) {
      return err.message;
    }
  }

  async monthOrdersAmount(today) {
    try {
      const value = await Order.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth(today), endOfDay(today)],
          },
        },
      });

      return value;
    } catch (err) {
      return err.message;
    }
  }
}

export default new SumaryValuesService();
