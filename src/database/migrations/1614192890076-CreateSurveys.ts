import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveys1614192890076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'surveys',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()'
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('surveys')
  }
}
