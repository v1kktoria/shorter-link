import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClicksTable1759598211000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clicks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'linkId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'NOW()',
          },
          {
            name: 'ip',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'browser',
            type: 'varchar',
            length: '128',
            isNullable: false,
          },
          {
            name: 'browserVersion',
            type: 'varchar',
            length: '128',
            isNullable: false,
          },
          {
            name: 'os',
            type: 'varchar',
            length: '128',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '128',
            isNullable: true,
          },
          {
            name: 'region',
            type: 'varchar',
            length: '128',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'clicks',
      new TableForeignKey({
        columnNames: ['linkId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'links',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('clicks');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('linkId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('clicks', foreignKey);
      }
      await queryRunner.dropTable('clicks');
    }
  }
}
