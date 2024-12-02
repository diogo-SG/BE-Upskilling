import { OrderSchema } from "../../schemas/order";
import dbClient from "../config";

// This should all be broken up into more tables and queries, but for the sake of simplicity, we'll keep it as is

/* -------------------------------------------------------------------------- */
/*                                Order queries                               */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Get all orders ----------------------------- */
async function getAllOrders(limit?: number): Promise<OrderSchema[]> {
  const query = `SELECT * FROM "order" ORDER BY id ${limit ? `LIMIT ${limit}` : ""}`;
  const { rows } = await dbClient.query(query);
  return rows;
}

/* ---------------------------- Get single order ---------------------------- */
async function getSingleOrderById(id: number): Promise<OrderSchema> {
  const query = `SELECT * FROM "order" WHERE id = $1`;
  const { rows } = await dbClient.query(query, [id]);
  return rows[0];
}

/* ------------------------------ Add new order ------------------------------ */
async function addNewOrder(data: Partial<OrderSchema>): Promise<OrderSchema> {
  const { user_id, product_id, quantity } = data;
  const query = `INSERT INTO "order" (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await dbClient.query(query, [user_id, product_id, quantity]);
  return rows[0];
}

/* ------------------------------- Edit order ------------------------------- */
async function editOrder(id: number, data: Partial<OrderSchema>): Promise<OrderSchema> {
  const { user_id, product_id, quantity } = data;
  const query = `UPDATE "order" SET user_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *`;
  const { rows } = await dbClient.query(query, [user_id, product_id, quantity, id]);
  return rows[0];
}

/* ----------------------------- Delete order ------------------------------ */

async function deleteOrder(id: number) {
  const query = `DELETE FROM "order" WHERE id = $1`;
  await dbClient.query(query, [id]);

  return;
}

export { getAllOrders, getSingleOrderById, addNewOrder, editOrder, deleteOrder };
