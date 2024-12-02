import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../middleware/errorHandler";
import OrderService from "../services/orderService";
import { matchedData, validationResult } from "express-validator";

/* -------------------------------------------------------------------------- */
/*                              Order controller                              */
/* -------------------------------------------------------------------------- */

const OrderController = { getAllOrders, getSingleOrderById, addNewOrder, editOrder, deleteOrder };

/* ----------------------------- Get all orders ----------------------------- */
async function getAllOrders(req: Request, res: Response, next: NextFunction) {
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    const error = new ErrorWithStatus(400, "Limit must be a positive number");
    next(error);
  }

  const data = matchedData(req);

  const limit = parseInt(data.limit as string);
  const fetchedOrders = await OrderService.getAllOrders(limit);

  res.status(200).json(fetchedOrders);
}

/* ---------------------------- Get single order ---------------------------- */
async function getSingleOrderById(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Order ID must be a number");
    next(error);
  }

  const orderId = parseInt(req.params.id);
  const order = await OrderService.getSingleOrderById(orderId);

  if (!order) {
    const error = new ErrorWithStatus(404, "Order not found");
    next(error);
  }

  res.status(200).json(order);
}

/* ----------------------------- Add new order ------------------------------ */

async function addNewOrder(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid order data");
    next(error);
  }

  const data = matchedData(req);

  const newOrder = await OrderService.addNewOrder(data);
  res.status(201).json(newOrder);
}

/* ------------------------------- Edit order ------------------------------- */

async function editOrder(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid order data");
    next(error);
  }

  const orderId = parseInt(req.params.id);
  const data = matchedData(req);

  const editedOrder = await OrderService.editOrder(orderId, data);
  res.status(200).json(editedOrder);
}

/* ----------------------------- Delete order ------------------------------ */

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Order ID must be a number");
    next(error);
  }

  const orderId = parseInt(req.params.id);
  await OrderService.deleteOrder(orderId);

  res.status(204).end();
}

export default OrderController;
