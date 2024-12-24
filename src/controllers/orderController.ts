import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../middleware/errorHandler";
import OrderService from "../services/OrderService";
import { matchedData, validationResult } from "express-validator";
import { EntityNoMetadata, OrderWithLines } from "../database/types/types";
import OrderEntity from "../database/entities/orders/OrderEntity";

/* -------------------------------------------------------------------------- */
/*                              Order controller                              */
/* -------------------------------------------------------------------------- */

const OrderController = { getAll, getSingleById, addNew, edit, remove };

/* ----------------------------- Get all orders ----------------------------- */
async function getAll(req: Request, res: Response, next: NextFunction) {
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    const error = new ErrorWithStatus(400, "Limit must be a positive number");
    next(error);
  }

  const data = matchedData(req);

  const limit = parseInt(data.limit as string);
  const fetchedOrders = await OrderService.getAll(limit);

  res.status(200).json(fetchedOrders);
}

/* ---------------------------- Get single order ---------------------------- */
async function getSingleById(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Order ID must be a number");
    next(error);
  }

  const orderId = parseInt(req.params.id);
  const order = await OrderService.getById(orderId);

  if (!order) {
    const error = new ErrorWithStatus(404, "Order not found");
    next(error);
  }

  res.status(200).json(order);
}

/* ----------------------------- Add new order ------------------------------ */

async function addNew(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid order data");
    next(error);
  }

  const data = matchedData(req) as EntityNoMetadata<OrderEntity>;

  const newOrder = await OrderService.addNew(data);
  res.status(201).json(newOrder);
}

/* ------------------------------- Edit order ------------------------------- */

async function edit(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid order data");
    next(error);
  }

  const data = matchedData(req) as OrderWithLines;

  const editedOrder = await OrderService.edit(data);
  res.status(200).json(editedOrder);
}

/* ----------------------------- Delete order ------------------------------ */

async function remove(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Order ID must be a number");
    next(error);
  }

  const orderId = parseInt(req.params.id);
  await OrderService.remove(orderId);

  res.status(204).end();
}

export default OrderController;
