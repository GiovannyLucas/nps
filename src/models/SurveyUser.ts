import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Survey } from "./Survey";
import { User } from "./User";
import { v4 as uuid } from "uuid";

@Entity('surveys_users')
export class SurveyUser {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'uuid' })
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey

  @Column({ nullable: true })
  value: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}