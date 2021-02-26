import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { SurveysRepository } from "../repositories/surveysRepository";
import { PaginationParams } from "../shared/@types/pagination";

export class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is invalid")
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error })
    }

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = await surveysRepository.createSurvey({ title, description })

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const { amount, page, search } = request.query;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRepository.showSurvey(String(search), { amount, page } as PaginationParams);

    return response.status(200).json(allSurveys);
  }
}