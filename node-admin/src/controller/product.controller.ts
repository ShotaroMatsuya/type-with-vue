import { Request, response, Response } from 'express';
import { getManager } from 'typeorm';
import { Product } from '../entity/product.entity';

export const Products = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  const products = await repository.find();

  res.send(products);
};

export const CreateProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  const product = await repository.save(req.body);

  res.status(201).send(product);
};

export const GetProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  res.send(await repository.findOne(req.params.id));
};

export const UpdateProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  await repository.update(req.params.id, req.body);

  res.status(202).send(await repository.findOne(req.params.id));
};

export const DeleteProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  await repository.delete(req.params.id);

  res.status(204).send(null);
};
