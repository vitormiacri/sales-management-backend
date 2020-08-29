import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('O email é obrigatório.'),
      password: Yup.string().required('A senha é obrigatória.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Invalid Fields', messages: err.inner });
  }
};
