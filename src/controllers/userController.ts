import * as yup from "yup";

import { Request, Response } from "express";

import { AppError } from "../errors/appError";
import { UsersRepository } from "../repositories/usersRepository";
import { getCustomRepository } from "typeorm";

export class UserController {
  async create (request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email("E-mail é inválido").required("E-mail é obrigatório")
    })

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error })
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new AppError('User already exists!', 409);
    }

    const user = await usersRepository.save(
      usersRepository.create({
        name,
        email
      })
    )

    return response.status(201).send(user)
  }
}