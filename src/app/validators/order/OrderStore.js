import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      total_value: Yup.number().required(
        'O valor total do pedido é obrigatório'
      ),
      client_id: Yup.number().required('O cliente é obrigatório'),
      payment_method: Yup.string().required(
        'O método de pagamento é obrigatório'
      ),
      payment_date: Yup.date(),
      discount: Yup.number(),
      products: Yup.array(Yup.object())
        .min(1)
        .required('Informe um produto'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Campos Inválidos', messages: err.inner });
  }
};
