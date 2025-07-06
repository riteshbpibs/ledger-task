
export interface Transaction {
  id?: string;
  date?: string;
  description?: string;
  debitAccount?: string;
  creditAccount?: string;
  amount?: number;
}
