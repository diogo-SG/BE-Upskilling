import { Schema } from "express-validator";

const login: Schema = {
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
  },
};

const logout: Schema = {
  userId: {
    in: ["body"],
    isNumeric: {
      errorMessage: "ID must be a number",
    },
  },
};

const signup: Schema = {
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

const AuthValidation = {
  login,
  logout,
  signup,
};

export default AuthValidation;
