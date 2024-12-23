import OrderEntity from "../database/entities/orders/OrderEntity";
import { OrderLineRepository } from "../database/repositories/Orders/OrderLineRepository";
import OrderRepository from "../database/repositories/Orders/OrderRepository";
import { EntityNoMetadata, OrderWithLines } from "../database/types/types";
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
async function addNew(newOrderData: EntityNoMetadata<OrderEntity>) {
  try {
    const addedOrder = await OrderRepo.create(newOrderData);

    if (!newOrderData.order_lines) {
      addedOrder.order_lines = [];
    }

    return addedOrder;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* ------------------------------- Edit order ------------------------------- */
async function edit(newOrderData: OrderWithLines) {
  try {
    const orderLines = newOrderData.order_lines;

    const orderLineIds = orderLines.map((line) => line.id);
    const orderData: EntityNoMetadata<OrderEntity> = { ...newOrderData, order_lines: orderLineIds };

    const editedOrder = await OrderRepo.update(orderData);

    const editedOrderLinesPromises = orderLines.map((line) => {
      return OrderLineRepo.update(line);
    });

    await Promise.all(editedOrderLinesPromises).catch((error) => {
      throw new ErrorWithStatus(500, "Something went wrong");
    });

    return editedOrder;
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
