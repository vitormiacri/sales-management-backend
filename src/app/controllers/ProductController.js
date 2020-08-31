import { Op } from 'sequelize';
import Product from '../Models/Product';
import CreateProductService from '../services/product/CreateProductService';
import UpdateProductservice from '../services/product/UpdateProductService';
import DeleteProductService from '../services/product/DeleteProductService';

class ProductController {
  async index(req, res) {
    try {
      const { name } = req.query;
      const where = {};
      if (name) {
        where.name = {
          [Op.or]: {
            [Op.eq]: name,
            [Op.substring]: name,
          },
        };
      }
      const allProducts = await Product.findAndCountAll({
        where: where || null,
      });
      return res.status(201).json(allProducts);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const product = await CreateProductService.run({
        product: req.body,
      });

      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const product = await UpdateProductservice.run({
        product: req.body,
        productId: req.params.id,
      });

      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await DeleteProductService.run({
        productId: req.params.id,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new ProductController();
