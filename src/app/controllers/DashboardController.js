import OrdersHistoryService from '../services/Dashboard/OrdersHistoryService';
import SumaryValuesService from '../services/Dashboard/SumaryValuesService';
import MonthValueGraphService from '../services/Dashboard/MonthValueGraphService';
import MonthCountGraphService from '../services/Dashboard/MonthCountGraphService';

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

  async totalValueGraph(req, res) {
    try {
      const result = await MonthValueGraphService.run();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async totalCountGraph(req, res) {
    try {
      const result = await MonthCountGraphService.run();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new DashboardController();
