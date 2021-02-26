import { EntityRepository, Repository } from "typeorm";

import { User } from "../models/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({ name, email }) {
    return await this.save(
      this.create({
        name,
        email
      })
    );
  }

  async indexUser(id: string) {
    return await this.findOne(id);
  }

  async indexUserByEmail(email: string) {
    return await this.findOne({ email });
  }
}