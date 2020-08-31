import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number().moreThan(0, 'O preço deve ser maior que zero'),
      cost: Yup.number().moreThan(0, 'O custo deve ser maior que zero'),
      quantity: Yup.number().moreThan(
        0,
        'A quantidade deve ser maior que zero'
      ),
      stock: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Invalid Fields', messages: err.inner });
  }
};
