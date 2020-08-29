import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório!'),
      email: Yup.string()
        .email()
        .required('O e-mail é obrigatório!'),
      password: Yup.string()
        .required('A senha é obrigatória!')
        .min(6, 'A senha deve conter no mínimo 6 caracteres!'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Invalid Fields', messages: err.inner });
  }
};
