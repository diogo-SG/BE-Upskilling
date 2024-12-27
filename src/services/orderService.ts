import OrderEntity from "../database/entities/orders/OrderEntity";
import { OrderLineRepository } from "../database/repositories/Orders/OrderLineRepository";
import OrderRepository from "../database/repositories/Orders/OrderRepository";
import { EntityNoMetadata, isArrayOfNumbers, OrderWithLines } from "../database/types/types";
import { ErrorWithStatus } from "../middleware/errorHandler";

const OrderRepo = new OrderRepository();
const OrderLineRepo = new OrderLineRepository();
/* -------------------------------------------------------------------------- */
/*                                Order Service                               */
/* -------------------------------------------------------------------------- */

const OrderService = {
  getAll,
  getById,
  addNew,
  edit,
  remove,
};

/* ------------------------------ Get all orders ----------------------------- */
async function getAll(limit?: number) {
  const orders = await OrderRepo.findAll(limit);
  return orders;
}

/* ----------------------------- Get single order ---------------------------- */

async function getById(orderId: number) {
  const order = await OrderRepo.findOneById(orderId);
  if (!order) {
    throw new ErrorWithStatus(404, "Order not found");
  }
  const orderLines = await OrderLineRepo.findAllByOrderId(orderId);
  const orderWithLines: OrderWithLines = { ...order, order_lines: orderLines };
  return orderWithLines;
}

/* ------------------------------ Add new order ------------------------------ */
async function addNew(newOrderData: EntityNoMetadata<OrderWithLines>) {
  try {
    const order_lines = newOrderData.order_lines;
    const newOrder: Partial<OrderWithLines> = { ...newOrderData };
    delete newOrder.order_lines;

    const addedOrder = await OrderRepo.create(newOrder);

    const newOrderLines = order_lines.map((line) => {
      return { ...line, order_id: addedOrder.id };
    });
    const addedOrderLinesPromises = newOrderLines.map((line) => {
      return OrderLineRepo.create(line);
    });

    await Promise.all(addedOrderLinesPromises).catch((error) => {
      throw new ErrorWithStatus(500, "Something went wrong: " + error.message);
    });

    return { ...addedOrder, order_lines: newOrderLines };
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong" + error);
  }
}

/* ------------------------------- Edit order ------------------------------- */
async function edit(newOrderData: OrderWithLines) {
  try {
    const orderLines = newOrderData.order_lines;
    // get the existing order
    const existingOrder = await OrderRepo.findOneById(newOrderData.id);
    if (!existingOrder) {
      throw new ErrorWithStatus(404, "Order not found");
    }
    const newOrder: Partial<OrderWithLines> = { ...existingOrder, ...newOrderData };
    delete newOrder.order_lines;

    const editedOrder = await OrderRepo.update(newOrder);

    // todo partial order line update
    const editedOrderLinesPromises = orderLines.map((line) => {
      return OrderLineRepo.update(line);
    });

    await Promise.all(editedOrderLinesPromises).catch((error) => {
      throw new ErrorWithStatus(500, "Something went wrong" + error);
    });

    return { ...editedOrder, order_lines: orderLines };
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* ----------------------------- Delete order ------------------------------ */
async function remove(orderId: number) {
  await OrderRepo.delete(orderId);

  return;
}

export default OrderService;
