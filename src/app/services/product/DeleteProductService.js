import Product from '../../Models/Product';

class DeleteProductService {
  async run({ productId }) {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    await product.destroy();

    return true;
  }
}

export default new DeleteProductService();
