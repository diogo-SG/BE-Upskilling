import { Schema } from "express-validator";

const addNew: Schema = {
  user_id: {
    in: ["body"],
    isNumeric: {
      errorMessage: "User ID must be a number",
    },
  },
  order_lines: {
    in: ["body"],
    isArray: {
      errorMessage: "Order lines must be an array",
    },
    notEmpty: {
      errorMessage: "Order lines must not be empty",
    },
  },
  status: {
    in: ["body"],
    isString: {
      errorMessage: "Status must be a string",
    },
    optional: true,
  },
};

export const edit: Schema = {
  id: {
    in: ["params"],
    exists: true,
    isNumeric: {
      errorMessage: "Order ID must be a number",
    },
  },
  user_id: {
    in: ["body"],
    optional: true,
    isNumeric: {
      errorMessage: "User ID must be a number",
    },
  },
  status: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Status must be a string",
    },
  },
  order_lines: {
    in: ["body"],
    optional: true,
    isArray: {
      errorMessage: "Order lines must be an array",
    },
    notEmpty: {
      errorMessage: "Order lines must not be empty",
    },
  },
};

const OrderValSchemas = {
  addNew,
  edit,
};

export default OrderValSchemas;
