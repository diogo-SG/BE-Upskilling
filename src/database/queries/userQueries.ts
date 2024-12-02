import { UserSchema } from "../../schemas/user";
import dbClient from "../config";

/* -------------------------------------------------------------------------- */
/*                                User queries                                */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Get all users ----------------------------- */
async function getAllUsers(limit?: number): Promise<UserSchema[]> {
  const query = `SELECT * FROM "user" ORDER BY id ${limit ? `LIMIT ${limit}` : ""}`;
  const { rows } = await dbClient.query(query);
  return rows;
}

/* ----------------------------- Get single user ---------------------------- */
async function getSingleUserById(id: number): Promise<UserSchema> {
  const query = `SELECT * FROM "user" WHERE id = $1`;
  const { rows } = await dbClient.query(query, [id]);
  return rows[0];
}

/* ------------------------------ Add new user ------------------------------ */
async function addNewUser(name: string, email: string, password: string, username: string) {
  const query = `INSERT INTO "user" (name, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await dbClient.query(query, [name, email, password, username]);
  return rows[0];
}

/* ----------- Check if a user with the given email already exists ---------- */
async function checkIfUserExistsByEmail(email: string) {
  const query = `SELECT * FROM "user" WHERE email = $1`;
  const { rows } = await dbClient.query(query, [email]);
  return rows[0];
}

/* -------------------------------- Edit user ------------------------------- */
async function editUser(id: number, updateData: Partial<UserSchema>) {
  const { name, email, password, username } = updateData;
  console.log(updateData);
  const query = `UPDATE "user" SET name = $1, email = $2, password = $3, username = $4 WHERE id = $5 RETURNING *`;
  const { rows } = await dbClient.query(query, [name, email, password, username, id]);
  return rows[0];
}

/* ----------------------------- Delete user ------------------------------ */
async function deleteUser(id: number) {
  const query = `DELETE FROM "user" WHERE id = $1`;
  await dbClient.query(query, [id]);

  return;
}

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

async function getAllOrdersFromUser(userId: number) {
  const query = `SELECT * FROM "order" WHERE user_id = $1`;
  const { rows } = await dbClient.query(query, [userId]);
  return rows;
}

async function getSingleOrderFromUser(userId: number, orderId: number) {
  const query = `SELECT * FROM "order" WHERE user_id = $1 AND id = $2`;
  const { rows } = await dbClient.query(query, [userId, orderId]);
  return rows[0];
}

export {
  getAllUsers,
  getSingleUserById,
  checkIfUserExistsByEmail,
  addNewUser,
  editUser,
  deleteUser,
  getAllOrdersFromUser,
  getSingleOrderFromUser,
};
