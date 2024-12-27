import { MigrationInterface, QueryRunner, Table } from "typeorm";

//todo improve
export class v0_02_SeedTables1734540142083 implements MigrationInterface {
  /* -------------------------------------------------------------------------- */
  /*                            Initial table seeding                           */
  /* -------------------------------------------------------------------------- */
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* ---------------------------------- Users --------------------------------- */
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("users")
      .values([
        {
          name: "John Doe",
          email: "johndoe@sharklasers.com",
          password: "password",
          username: "johndoe",
        },
        {
          name: "Jane Doe",
          email: "janedoe@sharklasers.com",
          password: "password",
          username: "janedoe",
        },
      ])
      .execute();

    /* -------------------------------- Products -------------------------------- */
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("products")
      .values([
        {
          name: "Product 1",
          description: "Description 1",
          price: 100,
          stock: 100,
        },
        {
          name: "Product 2",
          description: "Description 2",
          price: 200,
          stock: 200,
        },
      ])
      .execute();

    /* --------------------------------- Orders --------------------------------- */
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("orders")
      .values([
        {
          user_id: 1,
          status: "complete",
        },
        {
          user_id: 2,
          status: "complete",
        },
        {
          user_id: 2,
          status: "pending",
        },
      ])
      .execute();

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
        {
          order_id: 2,
          product_id: 1,
          quantity: 2,
        },
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
  }
}
