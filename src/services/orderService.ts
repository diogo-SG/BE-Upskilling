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

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* ------------------------------- Edit order ------------------------------- */
// todo fix
async function edit(newOrderData: OrderEntity | OrderWithLines) {
  try {
    let orderLinesToDelete: number[] = [];
    let newOrderLineIds: number[] = [];

    if (!newOrderData.order_lines) {
      newOrderData.order_lines = [];
    }

    // Get the existing order
    const existingOrder = await OrderRepo.findOneById(newOrderData.id);
    if (!existingOrder) {
      throw new ErrorWithStatus(404, "Order not found");
    }
    const existingOrderLineIds = existingOrder?.order_lines?.map((line) => line) ?? ([] as number[]);

    // // // if we just get the order lines ids, we need to fetch the order lines
    // // if (newOrderData.order_lines && isArrayOfNumbers(newOrderData.order_lines)) {
    // //   const newOrderLineIds = newOrderData.order_lines;

    // //   // But first, if some order lines have been removed, we need to delete them
    // //   orderLinesToDelete = existingOrderLineIds.filter((lineId) => !newOrderLineIds.includes(lineId));

    // //   const orderLines = await OrderLineRepo.findAllByOrderId(newOrderData.id);
    // //   newOrderData.order_lines = orderLines;
    // // }

    // // // now let's update things
    // // const orderLines = newOrderData.order_lines;
    // // newOrderLineIds = orderLines.map((line) => line.id);

    // // const orderData: EntityNoMetadata<OrderEntity> = { ...newOrderData, order_lines: newOrderLineIds };
    // // const editedOrder = await OrderRepo.update(orderData);

    // // const editedOrderLinesPromises = orderLines.map((line) => {
    // //   return OrderLineRepo.update(line);
    // // });

    // // await Promise.all(editedOrderLinesPromises).catch((error) => {
    // //   throw new ErrorWithStatus(500, "Something went wrong");
    // // });

    // // // Delete the order lines that have been removed
    // // if (orderLinesToDelete.length > 0) {
    // //   const orderLinesToDeletePromises = orderLinesToDelete.map((lineId) => {
    // //     return OrderLineRepo.delete(lineId);
    // //   });

    // //   await Promise.all(orderLinesToDeletePromises).catch((error) => {
    // //     throw new ErrorWithStatus(500, "Something went wrong");
    // //   });
    // // }

    // return editedOrder;
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
