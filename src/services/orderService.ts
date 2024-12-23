import OrderEntity from "../database/entities/orders/order";
import OrderRepository from "../database/repositories/Orders/OrderRepository";
import { EntitySansId } from "../database/types/types";
import { ErrorWithStatus } from "../middleware/errorHandler";

const OrderRepo = new OrderRepository();
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
  return order;
}

/* ------------------------------ Add new order ------------------------------ */
async function addNew(newOrderData: EntitySansId<OrderEntity>) {
  try {
    const addedOrder = await OrderRepo.create(newOrderData);

    return addedOrder;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* ------------------------------- Edit order ------------------------------- */
async function edit(newOrderData: OrderEntity) {
  try {
    const editedOrder = await OrderRepo.update(newOrderData);
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
