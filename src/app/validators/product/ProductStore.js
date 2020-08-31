import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      price: Yup.number()
        .moreThan(0, 'O preço deve ser maior que zero')
        .required('O preço de venda é obrigatório'),
      cost: Yup.number()
        .moreThan(0, 'O custo deve ser maior que zero')
        .required('O nome do produto é obrigatório'),
      quantity: Yup.number()
        .moreThan(0, 'A quantidade deve ser maior que zero')
        .required('A quantidade é obrigatória'),
      stock: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Campos Inválidos', messages: err.inner });
  }
};
