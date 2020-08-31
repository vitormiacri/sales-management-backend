import Product from '../../Models/Product';

class UpdateProductService {
  async run({ product, productId }) {
    const findProduct = await Product.findByPk(productId);

    const {
      id,
      name,
      price,
      cost,
      quantity,
      stock_amount,
    } = await findProduct.update(product);

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

export default new UpdateProductService();
