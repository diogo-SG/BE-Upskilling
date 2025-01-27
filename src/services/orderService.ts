import { DataSource } from "typeorm";
import { OrderLineRepository } from "../database/repositories/Orders/OrderLineRepository";
import OrderRepository from "../database/repositories/Orders/OrderRepository";
import { EntityNoMetadata, OrderWithLines } from "../database/types/types";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { BaseService } from "./BaseService";
import dataSource from "../database/dataSource";

/* -------------------------------------------------------------------------- */
/*                                Order Service                               */
/* -------------------------------------------------------------------------- */

class OrderService extends BaseService {
  private OrderRepo: OrderRepository;
  private OrderLineRepo: OrderLineRepository;

  constructor(activeDataSource: DataSource = dataSource) {
    super(activeDataSource);
    this.OrderRepo = new OrderRepository(activeDataSource);
    this.OrderLineRepo = new OrderLineRepository(activeDataSource);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */

  /* --------------------------------- Get all -------------------------------- */
  async getAll(limit?: number) {
    const orders = await this.OrderRepo.findAll(limit);
    return orders;
  }

  /* ------------------------------- Get by id ------------------------------- */
  async getById(orderId: number) {
    const order = await this.OrderRepo.findOneById(orderId);
    if (!order) {
      throw new ErrorWithStatus(404, "Order not found");
    }
    const orderLines = await this.OrderLineRepo.findAllByOrderId(orderId);
    const orderWithLines: OrderWithLines = { ...order, order_lines: orderLines };
    return orderWithLines;
  }

  /* --------------------------------- Add new -------------------------------- */
  async addNew(newOrderData: EntityNoMetadata<OrderWithLines>) {
    try {
      const order_lines = newOrderData.order_lines;
      const newOrder: Partial<OrderWithLines> = { ...newOrderData };
      delete newOrder.order_lines;

      const addedOrder = await this.OrderRepo.create(newOrder);

      // todo: insert all order lines in a single query
      const newOrderLines = order_lines.map((line) => {
        return { ...line, order_id: addedOrder.id };
      });
      const addedOrderLinesPromises = newOrderLines.map((line) => {
        return this.OrderLineRepo.create(line);
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

  /* --------------------------------- Edit --------------------------------- */
  async edit(newOrderData: OrderWithLines) {
    try {
      const orderLines = newOrderData.order_lines;
      // get the existing order
      const existingOrder = await this.OrderRepo.findOneById(newOrderData.id);
      if (!existingOrder) {
        throw new ErrorWithStatus(404, "Order not found");
      }
      const newOrder: Partial<OrderWithLines> = { ...existingOrder, ...newOrderData };
      delete newOrder.order_lines;

      const editedOrder = await this.OrderRepo.update(newOrder);

      // todo partial order line update
      const editedOrderLinesPromises = orderLines.map((line) => {
        return this.OrderLineRepo.update(line);
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

  /* --------------------------------- Remove -------------------------------- */

  async remove(orderId: number) {
    await this.OrderRepo.delete(orderId);

    return;
  }
}

export default OrderService;
