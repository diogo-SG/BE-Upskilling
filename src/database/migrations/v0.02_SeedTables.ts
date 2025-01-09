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
          name: "Rocket Launcher",
          description: "It shoots rockets",
          price: 20394012,
          stock: 100,
        },
        {
          name: "Air Fryer",
          description: "For when you need some air fried",
          price: 324234,
          stock: 200,
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
