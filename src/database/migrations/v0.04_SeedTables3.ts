import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class v0_04_SeedTables1734540142085 implements MigrationInterface {
  /* -------------------------------------------------------------------------- */
  /*                            Initial table seeding                           */
  /* -------------------------------------------------------------------------- */
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* ------------------------------ Order lines ------------------------------ */
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("order_lines")
      .values([
        /* --------------------------------- Order 1 -------------------------------- */
        {
          order_id: 1,
          product_id: 1,
          quantity: 1,
        },
        {
          order_id: 1,
          product_id: 2,
          quantity: 4,
        },
        /* --------------------------------- Order 2 -------------------------------- */
        { order_id: 2, product_id: 1, quantity: 2 },
        {
          order_id: 2,
          product_id: 2,
          quantity: 5,
        },
        /* --------------------------------- Order 3 -------------------------------- */
        {
          order_id: 3,
          product_id: 1,
          quantity: 3,
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
