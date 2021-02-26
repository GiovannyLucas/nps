import { Request, Response } from "express";

import { AppError } from "../errors/appError";
import { SurveysRepository } from "../repositories/surveysRepository";
import { SurveysUsersRepository } from "../repositories/surveysUsersRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";
import sendMailService from "../services/sendMailService";

export class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userExists = await usersRepository.indexUserByEmail(email);

    if (!userExists) {
      throw new AppError('Users does not exists!');
    }

    const surveyExists = await surveysRepository.indexSurvey(survey_id);

    if (!surveyExists) {
      throw new AppError('Survey does not exists!');
    }

    const surveyUserExists = await surveysUsersRepository.indexSurveyUserByUserAndAnswered(userExists.id)

    const variables = {
      name: userExists.name,
      title: surveyExists.title,
      description: surveyExists.description,
      id: '',
      host: process.env.URL_MAIL,
      route: 'answers'
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    if (surveyUserExists) {
      variables.id = surveyUserExists.id

      await sendMailService.execute(email, surveyExists.title, variables, npsPath)

      return response.json(surveyUserExists)
    }

    const surveyUser = await surveysUsersRepository.createSurveyUser({
      user_id: userExists.id,
      survey_id
    });

    variables.id = surveyUser.id

    await sendMailService.execute(email, surveyExists.title, variables, npsPath);

    return response.json(surveyUser);
  }
}