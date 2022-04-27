import { Request, Response } from 'express';
import { RegisterValidation } from '../validation/register.validation';

interface body {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export const Register = (req: Request, res: Response) => {
  const body: body = req.body;

  const { error } = RegisterValidation.validate(body);

  if (error) {
    return res.status(400).send(error.details);
  }

  if (body.password !== body.password_confirm) {
    return res.status(400).send({
      message: "Password's do not match",
    });
  }
  res.send(req.body);
};
