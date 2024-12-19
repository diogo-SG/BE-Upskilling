import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1734540142082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* --------------------------- Create users table --------------------------- */
    await queryRunner.createTable(
      new Table({
        name: "users", // Name of the table
        columns: [
          // Define the columns
          {
            name: "id", // Name of the column
            type: "serial", // Data type of the column
            isPrimary: true, // Primary key
            generationStrategy: "increment", // Auto increment
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "username",
            type: "varchar",
            length: "100",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    /* --------------------------- Create orders table -------------------------- */

    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          { name: "product_id", type: "int", isNullable: false },
          {
            name: "quantity",
            type: "int",
            isNullable: false,
          },

          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("orders");
  }
}
