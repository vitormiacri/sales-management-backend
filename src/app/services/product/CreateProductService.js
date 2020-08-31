import AppError from '../../../lib/app-error';
import Product from '../../Models/Product';

class CreateProductService {
  async run({ product }) {
    const productExists = await Product.findOne({
      where: { name: product.name },
    });

    if (productExists) {
      throw new AppError('Um produto com este nome já existe!');
    }

    const {
      id,
      name,
      price,
      cost,
      quantity,
      stock_amount,
    } = await Product.create(product);

    return {
      id,
      name,
      price,
      cost,
      quantity,
      stock_amount,
    };
  }
}

export default new CreateProductService();
