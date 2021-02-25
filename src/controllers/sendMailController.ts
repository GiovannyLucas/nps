import { Request, Response } from "express";

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

    const userExists = await usersRepository.findOne({ email });

    if (!userExists) {
      return response.status(400).send({
        error: 'Users does not exists!'
      });
    }

    const surveyExists = await surveysRepository.findOne({ id: survey_id });

    if (!surveyExists) {
      return response.status(400).send({
        error: 'Survey does not exists!'
      });
    }

    const variables = {
      name: userExists.name,
      title: surveyExists.title,
      description: surveyExists.description,
      user_id: userExists.id,
      host: process.env.URL_MAIL,
      route: 'answers'
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const surveyUserExists = await surveysUsersRepository.findOne({
      where: { user_id: userExists.id, value: null },
      relations: ['user', 'survey']
    })

    if (surveyUserExists) {
      await sendMailService.execute(email, surveyExists.title, variables, npsPath)
      return response.json(surveyUserExists)
    }

    const surveyUser = await surveysUsersRepository.save(
      surveysUsersRepository.create({
        user_id: userExists.id,
        survey_id
      })
    );







    await sendMailService.execute(email, surveyExists.title, variables, npsPath);

    return response.json(surveyUser);
  }
}