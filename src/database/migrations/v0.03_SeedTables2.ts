import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class v0_03_SeedTables1734540142084 implements MigrationInterface {
  /* -------------------------------------------------------------------------- */
  /*                            Initial table seeding                           */
  /* -------------------------------------------------------------------------- */
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* --------------------------------- Orders --------------------------------- */
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("orders")
      .values([
        {
          user_id: 1,
          order_lines: [1, 2],
          status: "complete",
        },
        {
          user_id: 2,
          order_lines: [3, 4],
          status: "complete",
        },
        {
          user_id: 2,
          order_lines: [5],
          status: "pending",
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("users")
      .where("username = :username", { username: "johndoe" })
      .orWhere("username = :username", { username: "janedoe" });

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("products")
      .where("name = :name", { name: "Rocket Launcher" })
      .orWhere("name = :name", { name: "Air Fryer" });
  }
}
