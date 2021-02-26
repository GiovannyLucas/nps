import { EntityRepository, ILike, Repository,  } from "typeorm";
import { PaginationParams } from "../shared/@types/pagination";
import { Survey } from "../models/Survey";
import { checkPaginationParams } from "../shared/functions/checkPaginationParams";

@EntityRepository(Survey)
export class SurveysRepository extends Repository<Survey> {
  async createSurvey({ title, description }) {
    return await this.save(
      this.create({
        title,
        description
      })
    );
  }

  async indexSurvey(id: string) {
    return await this.findOne(id);
  }

  async showSurvey(search: string, pagination: PaginationParams) {
    const searchParam = search ? '%'.concat(search).concat('%') : '%%';
    const { limit, offset } = checkPaginationParams(pagination)

    return await this.find({
      where: { title: ILike(searchParam) },
      take: limit,
      skip: offset
    });
  }
}