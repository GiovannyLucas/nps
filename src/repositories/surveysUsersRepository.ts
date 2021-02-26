import { EntityRepository, IsNull, Not, Repository } from "typeorm";

import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
export class SurveysUsersRepository extends Repository<SurveyUser> {
  async createSurveyUser({ user_id, survey_id }) {
    return await this.save(
      this.create({
        user_id,
        survey_id
      })
    );
  }

  async indexSurveyUser(id: string) {
    return await this.findOne(id);
  }

  async indexSurveyUserByUserAndAnswered(user_id: string) {
    return await this.findOne({
      where: { user_id, value: null },
      relations: ['user', 'survey']
    })
  }

  async indexSurveyUserBySurveyAndAnswered(survey_id: string) {
    return await this.find({
      survey_id,
      value: Not(IsNull())
    })
  }

  async updateSurveyUser(surveyUser: SurveyUser) {
    return await this.save(surveyUser);
  }
}