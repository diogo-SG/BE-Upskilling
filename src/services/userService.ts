// import * as UserQueries from "../database/queries/userQueries";
// import { ErrorWithStatus } from "../middleware/errorHandler";
// import { UserSchema } from "../schemas/user";

// /* -------------------------------------------------------------------------- */
// /*                                Users Service                               */
// /* -------------------------------------------------------------------------- */

// const UserService = {
//   getAllUsers,
//   getSingleUserById,
//   addNewUser,
//   editUser,
//   deleteUser,
//   getAllOrdersFromUser,
// };

// /* ------------------------------ Get all users ----------------------------- */

// async function getAllUsers(limit?: number) {
//   const users = await UserQueries.getAllUsers(limit);
//   return users;
// }

// /* ----------------------------- Get single user ---------------------------- */
// async function getSingleUserById(userId: number) {
//   const user = await UserQueries.getSingleUserById(userId);
//   if (!user) {
//     throw new ErrorWithStatus(404, "User not found");
//   }
//   return user;
// }

// /* ------------------------------ Add new user ------------------------------ */

// async function addNewUser(newUserData: Partial<UserSchema>) {
//   const { name, email, password, username } = newUserData;

//   if (!name || !email || !password || !username) {
//     throw new ErrorWithStatus(400, "Name, email, username and password are required");
//   }

//   try {
//     const emailCheckRes = await UserQueries.checkIfUserExistsByEmail(email);
//     if (emailCheckRes) {
//       throw new ErrorWithStatus(400, "User with this email already exists");
//     }

//     const addedUser = await UserQueries.addNewUser(name, email, password, username);
//     return addedUser;
//   } catch (error) {
//     if (error instanceof ErrorWithStatus) {
//       throw error;
//     }

//     throw new ErrorWithStatus(500, "Something went wrong");
//   }
// }

// /* -------------------------------- Edit user ------------------------------- */

// async function editUser(userId: number, userData: Partial<UserSchema>) {
//   let user = await UserQueries.getSingleUserById(userId);
//   if (!user) {
//     throw new ErrorWithStatus(404, "User not found");
//   }

//   if (userData.email) {
//     let userWithSameEmail = await UserQueries.checkIfUserExistsByEmail(userData.email);
//     if (userWithSameEmail && userWithSameEmail.id !== userId) {
//       throw new ErrorWithStatus(400, "User with this email already exists");
//     }
//   }

//   try {
//     const updatedUser = await UserQueries.editUser(userId, userData);
//     return updatedUser;
//   } catch (error) {
//     console.log(error);
//     throw new ErrorWithStatus(500, "Something went wrong!");
//   }
// }

// /* ----------------------------- Delete user ------------------------------ */

// async function deleteUser(userId: number) {
//   try {
//     const user = await UserQueries.getSingleUserById(userId);
//     if (!user) {
//       throw new ErrorWithStatus(404, "User not found");
//     }

//     await UserQueries.deleteUser(userId);
//   } catch (error) {
//     throw new ErrorWithStatus(500, "Something went wrong");
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                                 User orders                                */
// /* -------------------------------------------------------------------------- */

// async function getAllOrdersFromUser(userId: number) {
//   const orders = await UserQueries.getAllOrdersFromUser(userId);
//   return orders;
// }

// export default UserService;
