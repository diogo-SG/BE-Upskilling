import { Schema } from "express-validator";

const getAll: Schema = {
  limit: {
    in: ["query"],
    isNumeric: {
      errorMessage: "Limit must be a number",
    },
    optional: true,
  },
};

const getSingleById: Schema = {
  id: {
    in: ["params"],
    isNumeric: {
      errorMessage: "ID must be a number",
    },
  },
};

const remove: Schema = {
  id: {
    in: ["params"],
    isNumeric: {
      errorMessage: "ID must be a number",
    },
  },
};

const login: Schema = {
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
  },
};

const GenericValidation = {
  getAll,
  getSingleById,
  remove,
  login,
};

export default GenericValidation;
