import { Request, Response } from "express";

import { SurveysRepository } from "../repositories/surveysRepository";
import { getCustomRepository } from "typeorm";

export class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = await surveysRepository.save(
      surveysRepository.create({
        title,
        description
      })
    )

    return response.status(201).json(survey);
  }

  async show(_: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRepository.find();

    return response.status(200).json(allSurveys);
  }
}