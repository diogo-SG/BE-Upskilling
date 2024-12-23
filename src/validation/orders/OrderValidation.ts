import { Schema } from "express-validator";

const addNewOrder: Schema = {
  user_id: {
    in: ["body"],
    isNumeric: {
      errorMessage: "User ID must be a number",
    },
  },
  product_id: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Product ID must be a number",
    },
  },
  quantity: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Quantity must be a number",
    },
  },
};

export const editOrder: Schema = {
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
  product_id: {
    in: ["body"],
    optional: true,
    isNumeric: {
      errorMessage: "Product ID must be a number",
    },
  },
  quantity: {
    in: ["body"],
    optional: true,
    isNumeric: {
      errorMessage: "Quantity must be a number",
    },
  },
};

export const deleteOrder: Schema = {
  id: {
    in: ["params"],
    isNumeric: {
      errorMessage: "Order ID must be a number",
    },
  },
};

const OrderValSchemas = {
  addNewOrder,
  editOrder,
  deleteOrder,
};

export default OrderValSchemas;
