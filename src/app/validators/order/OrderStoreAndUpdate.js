import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      total_value: Yup.number().required(
        'O valor total do pedido é obrigatório'
      ),
      payment_method: Yup.string().required('O nome é obrigatório'),
      payment_date: Yup.date().required('A data inicial é obrigatória.'),
      discount: Yup.number().required('A quantidade é obrigatória'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Campos Inválidos', messages: err.inner });
  }
};
