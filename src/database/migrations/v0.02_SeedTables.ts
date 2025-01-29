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
        {
          name: "Person 1",
          email: "p1@sharklasers.com",
          password: "password",
          username: "p1",
        },
        {
          name: "Person 2",
          email: "p2@sharklasers.com",
          password: "password",
          username: "p2",
        },
        {
          name: "Person 3",
          email: "p3@sharklasers.com",
          password: "password",
          username: "p3",
        },
        {
          name: "Person 4",
          email: "p4@sharklasers.com",
          password: "password",
          username: "p4",
        },
        {
          name: "Person 5",
          email: "p5@sharklasers.com",
          password: "password",
          username: "p5",
        },
        {
          name: "Person 6",
          email: "p6@sharklasers.com",
          password: "password",
          username: "p6",
        },
        {
          name: "Person 7",
          email: "p7@sharklasers.com",
          password: "password",
          username: "p7",
        },
        {
          name: "Person 8",
          email: "p8@sharklasers.com",
          password: "password",
          username: "p8",
        },
        {
          name: "Person 9",
          email: "p9@sharklasers.com",
          password: "password",
          username: "p9",
        },
        {
          name: "Person 10",
          email: "p10@sharklasers.com",
          password: "password",
          username: "p10",
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
