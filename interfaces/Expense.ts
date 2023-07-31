export interface Expense {
  id?: number;
  userId?: number;
  categoryId?: number;
  amount: number;
  description?: string;
  name?: string;
  payDate?: any;
  paydate?: any;
  color?: string | undefined;
}
