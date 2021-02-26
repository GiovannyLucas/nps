import { IsNull, Not, getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { SurveysUsersRepository } from "../repositories/surveysUsersRepository";

export class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.indexSurveyUserBySurveyAndAnswered(survey_id);

    const detractors = surveysUsers.filter(su => su.value >= 0 && su.value <= 6).length;
    const promoters = surveysUsers.filter(su => su.value >= 9).length;
    const passives = surveysUsers.filter(su => su.value >= 7 && su.value <= 8).length;

    const totalAnswers = surveysUsers.length;

    // Cálculo de NPS => (PROMOTORES - DETRATORES) /  TOTAL DE RESPONDENTES * 100
    const npsPercent = (promoters - detractors) / totalAnswers * 100

    return response.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      npsPercent: +npsPercent.toFixed(2)
    })
  }
}