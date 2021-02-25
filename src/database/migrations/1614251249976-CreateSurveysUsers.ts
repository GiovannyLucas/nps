import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614251249976 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'surveys_users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true
            },
            {
              name: 'user_id',
              type: 'uuid'
            },
            {
              name: 'survey_id',
              type: 'uuid'
            },
            {
              name: 'value',
              type: 'number',
              isNullable: true
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'NOW()'
            }
          ],
          foreignKeys: [
            {
              name: 'fk_user',
              columnNames: ['user_id'],
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            },
            {
              name: 'fk_survey',
              columnNames: ['survey_id'],
              referencedTableName: 'surveys',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('surveys_users')
    }
}
