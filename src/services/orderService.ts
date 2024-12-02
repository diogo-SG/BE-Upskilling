import * as OrderQueries from "../database/queries/orderQueries";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { OrderSchema } from "../schemas/order";

/* -------------------------------------------------------------------------- */
/*                                Order Service                               */
/* -------------------------------------------------------------------------- */

const OrderService = {
  getAllOrders,
  getSingleOrderById,
  addNewOrder,
  editOrder,
  deleteOrder,
};

/* ------------------------------ Get all orders ----------------------------- */
async function getAllOrders(limit?: number) {
  const orders = await OrderQueries.getAllOrders(limit);
  return orders;
}

/* ----------------------------- Get single order ---------------------------- */

async function getSingleOrderById(orderId: number) {
  const order = await OrderQueries.getSingleOrderById(orderId);
  if (!order) {
    throw new ErrorWithStatus(404, "Order not found");
  }
  return order;
}

/* ------------------------------ Add new order ------------------------------ */
async function addNewOrder(newOrderData: Partial<OrderSchema>) {
  const { user_id, product_id, quantity } = newOrderData;

  if (!user_id || !product_id || !quantity) {
    throw new ErrorWithStatus(400, "User ID, product ID and quantity are required");
  }

  try {
    const addedOrder = await OrderQueries.addNewOrder(newOrderData);
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
async function editOrder(orderId: number, newOrderData: Partial<OrderSchema>) {
  const { user_id, product_id, quantity } = newOrderData;

  if (!user_id || !product_id || !quantity) {
    throw new ErrorWithStatus(400, "User ID, product ID and quantity are required");
  }

  try {
    const editedOrder = await OrderQueries.editOrder(orderId, newOrderData);
    return editedOrder;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* ----------------------------- Delete order ------------------------------ */
async function deleteOrder(orderId: number) {
  await OrderQueries.deleteOrder(orderId);

  return;
}

export default OrderService;
