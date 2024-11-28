import { checkSchema, Schema } from "express-validator";

export const editUserValidationSchema: Schema = {
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
};
