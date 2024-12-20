import OrderRepository from "../database/repositories/OrderRepository";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { OrderSchema } from "../database/types/order";
import dataSource from "../database/dataSource";

const OrderQueries = new OrderRepository(dataSource);
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
  const orders = await OrderQueries.findAll(limit);
  return orders;
}

/* ----------------------------- Get single order ---------------------------- */

async function getById(orderId: number) {
  const order = await OrderQueries.findOneById(orderId);
  if (!order) {
    throw new ErrorWithStatus(404, "Order not found");
  }
  return order;
}

/* ------------------------------ Add new order ------------------------------ */
async function addNew(newOrderData: Partial<OrderSchema>) {
  const { user_id, product_id, quantity } = newOrderData;

  if (!user_id || !product_id || !quantity) {
    throw new ErrorWithStatus(400, "User ID, product ID and quantity are required");
  }

  try {
    const addedOrder = await OrderQueries.create(newOrderData);
    console.log("addedOrder", addedOrder);
    return addedOrder;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* ------------------------------- Edit order ------------------------------- */
async function edit(newOrderData: OrderSchema) {
  const { id, user_id, product_id, quantity } = newOrderData;

  if (!user_id || !product_id || !quantity) {
    throw new ErrorWithStatus(400, "User ID, product ID and quantity are required");
  }

  try {
    const editedOrder = await OrderQueries.update(newOrderData);
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
  await OrderQueries.delete(orderId);

  return;
}

export default OrderService;
