import { Schema } from "express-validator";

export const edit: Schema = {
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
  edit,
};

export default UserValSchemas;
