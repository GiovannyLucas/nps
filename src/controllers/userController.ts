import { Request, Response } from "express";

export class UserController {
  async create (request: Request, response: Response) {
    return response.send('chegou aqui')
  }
}