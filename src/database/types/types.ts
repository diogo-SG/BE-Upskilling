import BaseEntity from "../entities/BaseEntity";
import OrderLineEntity from "../entities/orders/OrderLineEntity";

/* -------------------------------------------------------------------------- */
/*                                 Base types                                 */
/* -------------------------------------------------------------------------- */
export type EntityNoMetadata<T extends BaseEntity> = Omit<T, "id" | "created_at" | "updated_at">;

/* -------------------------------------------------------------------------- */
/*                            Compound entity types                           */
/* -------------------------------------------------------------------------- */

export interface OrderWithLines {
  id: number;
  user_id: number;
  status: string;
  order_lines: OrderLineEntity[];
}
