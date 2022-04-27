import { Request, Response } from 'express';
import { RegisterValidation } from '../validation/register.validation';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';
import bcryptjs from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

interface body {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  password_confirm?: string;
}

export const Register = async (req: Request, res: Response) => {
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

  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10),
  });

  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const user = await repository.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      message: 'invalid credentials!',
    });
  }

  if (!(await bcryptjs.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: 'invalid credentials!',
    });
  }

  const token = sign(
    {
      id: user.id,
    },
    'secret'
  );

  // httpOnly cookie
  // It's only the feature of each of the only cookies is that they are not accessible by the frontend only.
  // backend can use these cookie, which means that frontend cannot access it.
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1day
  });
  res.send({
    message: 'success',
  });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  const jwt = req.cookies['jwt'];

  const payload: any = verify(jwt, 'secret');

  if (!payload) {
    return res.status(401).send({ message: 'unauthenticated' });
  }

  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.findOne(payload.id);

  res.send(user);
};
