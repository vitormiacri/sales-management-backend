import OrdersHistoryService from '../services/Dashboard/OrdersHistoryService';
import SumaryValuesService from '../services/Dashboard/SumaryValuesService';

class DashboardController {
  async totalOrdersSumary(req, res) {
    try {
      const result = await SumaryValuesService.run();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async ordersHistory(req, res) {
    try {
      const result = await OrdersHistoryService.run();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new DashboardController();
