import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class v0_01_CreateUsersTable1734540142082 implements MigrationInterface {
  /* -------------------------------------------------------------------------- */
  /*                                Create tables                               */
  /* -------------------------------------------------------------------------- */

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
            name: "orders",
            type: "int",
            isArray: true,
            isNullable: true,
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
          {
            name: "status",
            type: "varchar",
            length: "100",
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

    /* ----------------------------- Products table ----------------------------- */
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "price",
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
      })
    );

    /* --------------------------- Order lines table --------------------------- */
    await queryRunner.createTable(
      new Table({
        name: "order_lines",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "order_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "product_id",
            type: "int",
            isNullable: false,
          },
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
      })
    );

    /* ---------------------------- Add foreign keys ---------------------------- */
    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "order_lines",
      new TableForeignKey({
        columnNames: ["order_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "orders",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "order_lines",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("orders");
    await queryRunner.dropTable("products");
    await queryRunner.dropTable("order_lines");
  }
}
