export interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  participants: string[];
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

export interface FinancialInfo {
  expenses: Expense[];
}

export interface Task {
  id: string;
  description: string;
  assignedTo: string[];
  completedBy: string[];
}

export interface Payment {
  id: string;
  amount: number;
  paidBy: string;
  paymentMethod: string;
  date: string;
}
