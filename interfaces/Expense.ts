export interface Expense {
  id?: number;
  userId?: number;
  categoryId?: number;
  amount: number;
  description: string;
  date?: any;
}
