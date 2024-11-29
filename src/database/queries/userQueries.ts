const getAllUsers = `SELECT * FROM "user"`;
const getSingleUser = `SELECT * FROM "user" WHERE id = $1`;
const checkIfUserExistsByEmail = `SELECT * FROM "user" WHERE email = $1`;
const addNewUser = `INSERT INTO "user" (name, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *`;

export { getAllUsers, getSingleUser, checkIfUserExistsByEmail, addNewUser };
