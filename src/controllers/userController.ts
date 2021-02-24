import { Request, Response } from "express";

import { UsersRepository } from "../repositories/usersRepository";
import { getCustomRepository } from "typeorm";

export class UserController {
  async create (request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      return response.status(409).json({ error: 'User already exists!' })
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