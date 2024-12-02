import { Schema } from "express-validator";

const getAllUsers: Schema = {
  limit: {
    in: ["query"],
    isNumeric: {
      errorMessage: "Limit must be a number",
    },
    optional: true,
  },
};

const getSingleUserById: Schema = {
  id: {
    in: ["params"],
    isNumeric: {
      errorMessage: "User ID must be a number",
    },
  },
};

const addNewUser: Schema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email is invalid",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
  },
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Username must be a string",
    },
  },
};

export const editUser: Schema = {
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
};

const deleteUser: Schema = {
  id: {
    in: ["params"],
    isNumeric: {
      errorMessage: "User ID must be a number",
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

const getAllOrdersFromUser: Schema = {
  limit: {
    in: ["query"],
    isNumeric: {
      errorMessage: "Limit must be a number",
    },
    optional: true,
  },
};

const getSingleOrderFromUser: Schema = {
  id: {
    in: ["params"],
    isNumeric: {
      errorMessage: "Order ID must be a number",
    },
  },
};

const UserValSchemas = {
  getSingleUserById,
  getAllUsers,
  addNewUser,
  editUser,
  deleteUser,
  /* --------------------------------- orders --------------------------------- */
  getAllOrdersFromUser,
  getSingleOrderFromUser,
};

export default UserValSchemas;
