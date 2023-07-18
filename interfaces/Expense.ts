export interface Expense {
  id?: number;
  userId?: number;
  categoryId?: number;
  amount: number;
  description?: string;
  name?: string;
  date?: any;
  color?: string | undefined;
}
