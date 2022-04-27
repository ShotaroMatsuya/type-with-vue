import { RequestHandler, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';

interface MyRequestLocals extends Request {
  user: User;
}

export const AuthMiddleware: RequestHandler = async (
  req: MyRequestLocals,
  res,
  next
) => {
  try {
    const jwt = req.cookies['jwt'];

    const payload: any = verify(jwt, process.env.SECRET_KEY);

    if (!payload) {
      return res.status(401).send({ message: 'unauthenticated' });
    }

    const repository = getManager().getRepository(User);

    const user = await repository.findOne(payload.id);
    req.user = user;

    // req["user"] = await repository.findOne(payload.id);

    next();
  } catch (e) {
    return res.status(401).send({ message: 'unauthenticated' });
  }
};
