import OrderLineEntity from "../database/entities/orders/OrderLineEntity";
import {
  EntityNoMetadata,
  OrderLineNoMetadata,
  OrderWithLines,
  OrderWithLinesNoMetadata,
} from "../database/types/types";
import OrderService from "../services/OrderService";
import { TestDBHandler } from "./testDBHandler";

describe("Orders", () => {
  let testDataHandler: TestDBHandler;
  let orderService: OrderService;

  beforeEach(async () => {
    testDataHandler = new TestDBHandler();
    await testDataHandler.createDB();
    orderService = new OrderService(testDataHandler.testDataSource);
  });

  afterEach(async () => {
    await testDataHandler.dropDB();
  });

  it("should return a list of orders", async () => {
    const orders = await orderService.getAll();
    console.log(orders);
    expect(orders).toHaveLength(3);
    expect(orders[0].user_id).toBe(1);
  });

  it("should return a single order by id", async () => {
    const order = await orderService.getById(2);
    expect(order.user_id).toBe(2);
  });

  it("Should add a new order", async () => {
    // todo fix types
    const newOrderLines: any[] = [
      {
        product_id: 1,
        quantity: 2,
      },
      {
        product_id: 2,
        quantity: 1,
      },
    ];
    const newOrder: any = {
      status: "pending",
      user_id: 1,
      order_lines: newOrderLines as OrderLineEntity[],
    };

    const addedOrder = await orderService.addNew(newOrder);

    expect(addedOrder.user_id).toBe(1);
    expect(addedOrder.order_lines).toHaveLength(2);

    const orders = await orderService.getAll();
    expect(orders).toHaveLength(4);

    const order = await orderService.getById(4);

    expect(order.user_id).toBe(1);
    expect(order.order_lines).toHaveLength(2);
  });

  it("Should update an order", async () => {
    const orderUpdate: any = {
      id: 1,
      status: "complete",
      user_id: 1,
      order_lines: [
        {
          id: 1,
          product_id: 1,
          quantity: 2,
        },
        {
          id: 2,
          product_id: 2,
          quantity: 1,
        },
      ],
    };

    const updatedOrder = await orderService.edit(orderUpdate);

    expect(updatedOrder.user_id).toBe(1);
    expect(updatedOrder.order_lines).toHaveLength(2);
    const order = await orderService.getById(1);
    expect(order.status).toBe("complete");
  });

  it("Should delete an order", async () => {
    await orderService.remove(1);
    const orders = await orderService.getAll();
    expect(orders).toHaveLength(2);

    // also check order lines
    const OrderLineRepo = testDataHandler.testDataSource.getRepository(OrderLineEntity);
    const orderLines = await OrderLineRepo.find({ where: { order_id: 1 } });

    expect(orderLines).toHaveLength(0);
  });
});
