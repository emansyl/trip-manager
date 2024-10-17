import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Expense, FinancialInfo, TripDetails } from "~/types";

interface ExpensesTabProps {
  financialInfo: FinancialInfo;
  setFinancialInfo: React.Dispatch<React.SetStateAction<FinancialInfo>>;
  tripDetails: TripDetails;
}

const ExpensesTab: React.FC<ExpensesTabProps> = ({
  financialInfo,
  setFinancialInfo,
  tripDetails,
}) => {
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    description: "",
    amount: 0,
    paidBy: "",
    splitBetween: [],
  });

  const handleAddExpense = () => {
    if (
      newExpense.description &&
      newExpense.amount > 0 &&
      newExpense.paidBy &&
      newExpense.splitBetween.length > 0
    ) {
      const expense: Expense = {
        ...newExpense,
        id: Date.now().toString(),
      };
      setFinancialInfo((prev) => ({
        ...prev,
        expenses: [...prev.expenses, expense],
      }));
      setNewExpense({
        description: "",
        amount: 0,
        paidBy: "",
        splitBetween: [],
      });
    }
  };

  const handleRemoveExpense = (id: string) => {
    setFinancialInfo((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense.id !== id),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Expenses</CardTitle>
        <CardDescription>Add or remove trip expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <Input
            placeholder="Expense description"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense((prev) => ({
                ...prev,
                amount: parseFloat(e.target.value),
              }))
            }
          />
          <Select
            value={newExpense.paidBy}
            onValueChange={(value) =>
              setNewExpense((prev) => ({ ...prev, paidBy: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Paid by" />
            </SelectTrigger>
            <SelectContent>
              {tripDetails.participants.map((participant) => (
                <SelectItem key={participant} value={participant}>
                  {participant}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <Label>Split between:</Label>
            {tripDetails.participants.map((participant) => (
              <div key={participant} className="flex items-center space-x-2">
                <Checkbox
                  id={`split-${participant}`}
                  checked={newExpense.splitBetween.includes(participant)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setNewExpense((prev) => ({
                        ...prev,
                        splitBetween: [...prev.splitBetween, participant],
                      }));
                    } else {
                      setNewExpense((prev) => ({
                        ...prev,
                        splitBetween: prev.splitBetween.filter(
                          (p) => p !== participant
                        ),
                      }));
                    }
                  }}
                />
                <Label htmlFor={`split-${participant}`}>{participant}</Label>
              </div>
            ))}
          </div>
          <Button onClick={handleAddExpense}>Add Expense</Button>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Recorded Expenses:</h4>
          {financialInfo.expenses.map((expense) => (
            <div
              key={expense.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <p>
                  {expense.description} - ${expense.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Paid by: {expense.paidBy} | Split between:{" "}
                  {expense.splitBetween.join(", ")}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveExpense(expense.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesTab;
