import express from "express";
import UserRouter from "./users/UserRoutes";
import OrderRouter from "./orders/OrderRoutes";
import ProductRouter from "./products/ProductRoutes";
import deserializeUser from "../../middleware/deserializeUser";
import { requireAuth } from "../../middleware/requireAuth";

const ApiRouter = express.Router();

ApiRouter.use(deserializeUser);
ApiRouter.use(requireAuth);
ApiRouter.use("/users", UserRouter);
ApiRouter.use("/orders", OrderRouter);
ApiRouter.use("/products", ProductRouter);

export default ApiRouter;
