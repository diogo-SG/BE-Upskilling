export interface OrderSchema {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: Date;
}
