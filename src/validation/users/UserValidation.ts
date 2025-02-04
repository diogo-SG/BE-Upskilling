import { Schema } from "express-validator";
import UserEntity from "../../database/entities/users/UserEntity";
// import UserRepository from "../../database/repositories/Users/UserRepository";
// import dataSource from "../../database/dataSource";

// Todo: frustratingly, this doesn't work EntityMetadataNotFoundError: No metadata for "UserEntity" was found.
// Race condition of some sort perhaps? Anyway not a huge priority to fix.
// const userRepo = new UserRepository();
// const userKeys = userRepo.getKeys();
// console.log(userKeys);

const userKeys = ["name", "email", "password", "username", "orders"];

const getAllPaginated: Schema = {
  limit: {
    in: ["query"],
    isNumeric: {
      errorMessage: "Limit must be a number",
    },
    optional: true,
  },
  page: {
    in: ["query"],
    isNumeric: {
      errorMessage: "Page must be a number",
    },
    optional: true,
  },
  sortField: {
    in: ["query"],
    isString: {
      errorMessage: "Sort field must be a string",
    },
    isIn: { options: [userKeys] },
    optional: true,
  },
  sortOrder: {
    in: ["query"],
    isString: {
      errorMessage: "Sort order must be a string",
    },
    isIn: { options: [["ASC", "DESC"]] },
    optional: true,
  },
};

const edit: Schema = {
  id: {
    in: ["params"],
    exists: true,
    isNumeric: {
      errorMessage: "User ID must be a number",
    },
  },
  name: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  email: {
    in: ["body"],
    optional: true,
    isEmail: {
      errorMessage: "Email is invalid",
    },
  },
  password: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Password must be a string",
    },
  },
  username: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  orders: {
    in: ["body"],
    optional: true,
    isArray: {
      errorMessage: "Orders must be an array",
    },
    notEmpty: {
      errorMessage: "Orders must not be empty",
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

const UserValSchemas = {
  getAllPaginated,
  edit,
};

export default UserValSchemas;
