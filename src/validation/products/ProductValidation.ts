import { Schema } from "express-validator";

const addNew: Schema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Description must be a string",
    },
  },
  price: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Price must be a number",
    },
  },
  stock: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Stock must be a number",
    },
  },
};

export const edit: Schema = {
  id: {
    in: ["params"],
    exists: true,
    isNumeric: {
      errorMessage: "Product ID must be a number",
    },
  },
  name: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  description: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Description must be a string",
    },
  },
  price: {
    in: ["body"],
    optional: true,
    isNumeric: {
      errorMessage: "Price must be a number",
    },
  },
};

const ProductValidation = {
  addNew,
  edit,
};

export default ProductValidation;
