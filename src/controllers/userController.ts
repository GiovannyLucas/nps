import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { AppError } from "../errors/appError";
import { UsersRepository } from "../repositories/usersRepository";

export class UserController {
  async create (request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email("E-mail is invalid").required("E-mail is required")
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error })
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.indexUserByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists!', 409);
    }

    const user = await usersRepository.createUser({ name, email })

    return response.status(201).send(user)
  }
}