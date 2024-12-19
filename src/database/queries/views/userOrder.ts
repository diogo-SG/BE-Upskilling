// import dbClient from "../../config";

// export async function CreateViewUserOrdersData(userId: number) {
//   const query = `
//     CREATE VIEW user_order AS
//     SELECT "order".id, "order".user_id, "order".product_id, "order".quantity, "user".name, "user".email, "user".username
//     FROM "order", "user"
//     WHERE "order".user_id = "user".id AND "order".user_id = ${userId}
//     `;
//   const res = await dbClient.query(query);
//   console.log(res);
//   const rows = res.rows;

//   return rows;
// }
