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
});
