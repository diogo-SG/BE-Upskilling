import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { matchedData, validationResult } from "express-validator";
import { EntityNoMetadata, OrderWithLines } from "../database/types/types";
import OrderService from "../services/OrderService";

/* --------------------------------- Service -------------------------------- */

const orderService = new OrderService();

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
  const fetchedOrders = await orderService.getAll(limit);

  res.status(200).json(fetchedOrders);
}

/* ---------------------------- Get single order ---------------------------- */
async function getSingleById(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Order ID must be a number");
    next(error);
  }

  const orderId = parseInt(req.params.id);
  const order = await orderService.getById(orderId);

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

  const data = matchedData(req) as EntityNoMetadata<OrderWithLines>;

  const newOrder = await orderService.addNew(data);
  res.status(201).json(newOrder);
}

/* ------------------------------- Edit order ------------------------------- */

async function edit(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid order data");
    next(error);
  }

  try {
    const data = matchedData(req) as OrderWithLines;

    const editedOrder = await orderService.edit(data);
    res.status(200).json(editedOrder);
  } catch (error) {
    next(error);
  }
}

/* ----------------------------- Delete order ------------------------------ */

async function remove(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Order ID must be a number");
    next(error);
  }

  const orderId = parseInt(req.params.id);
  await orderService.remove(orderId);

  res.status(204).end();
}

export default OrderController;
