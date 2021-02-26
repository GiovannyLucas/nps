import { Request, Response } from "express";
import { AppError } from "../errors/appError";
import { SurveysUsersRepository } from "../repositories/surveysUsersRepository";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";

export class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.indexSurveyUser(String(u));

    if (!surveyUser) {
      throw new AppError('Survey does not exists!');
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser)

    const pathImage = resolve(__dirname, '..', 'static', 'thanks.jpg');

    return response.sendFile(pathImage)
  }
}