import BaseEntity from "../entities/BaseEntity";
import OrderEntity from "../entities/orders/OrderEntity";
import OrderLineEntity from "../entities/orders/OrderLineEntity";

/* -------------------------------------------------------------------------- */
/*                                 Base types                                 */
/* -------------------------------------------------------------------------- */
export type EntityNoMetadata<T extends BaseEntity> = Omit<T, "id" | "created_at" | "updated_at">;

/* -------------------------------------------------------------------------- */
/*                            Compound entity types                           */
/* -------------------------------------------------------------------------- */

export interface OrderWithLines extends OrderEntity {
  order_lines: OrderLineEntity[];
}

/* -------------------------------------------------------------------------- */
/*                            Type checking helpers                           */
/* -------------------------------------------------------------------------- */

export function isArrayOfNumbers(arr: any[]): arr is number[] {
  return Array.isArray(arr) && arr.every((item) => typeof item === "number");
}

export function isArrayOfStrings(arr: any[]): arr is string[] {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string");
}
