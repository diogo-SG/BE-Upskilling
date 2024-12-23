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

const GenericValidation = {
  getAll,
  getSingleById,
  remove,
};

export default GenericValidation;
