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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Payment, TripDetails } from "~/types";

interface PaymentsTabProps {
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  tripDetails: TripDetails;
}

const PaymentsTab: React.FC<PaymentsTabProps> = ({
  payments,
  setPayments,
  tripDetails,
}) => {
  const [newPayment, setNewPayment] = useState<Omit<Payment, "id">>({
    amount: 0,
    paidBy: "",
    paymentMethod: "",
    date: "",
  });

  const handleAddPayment = () => {
    if (
      newPayment.amount > 0 &&
      newPayment.paidBy &&
      newPayment.paymentMethod &&
      newPayment.date
    ) {
      const payment: Payment = {
        ...newPayment,
        id: Date.now().toString(),
      };
      setPayments((prev) => [...prev, payment]);
      setNewPayment({ amount: 0, paidBy: "", paymentMethod: "", date: "" });
    }
  };

  const handleRemovePayment = (id: string) => {
    setPayments((prev) => prev.filter((payment) => payment.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Payments</CardTitle>
        <CardDescription>Record payments made by participants</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                amount: parseFloat(e.target.value),
              })
            }
          />
          <Select
            value={newPayment.paidBy}
            onValueChange={(value) =>
              setNewPayment({ ...newPayment, paidBy: value })
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
          <Input
            placeholder="Payment method"
            value={newPayment.paymentMethod}
            onChange={(e) =>
              setNewPayment({ ...newPayment, paymentMethod: e.target.value })
            }
          />
          <Input
            type="date"
            value={newPayment.date}
            onChange={(e) =>
              setNewPayment({ ...newPayment, date: e.target.value })
            }
          />
          <Button onClick={handleAddPayment}>Add Payment</Button>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Recorded Payments:</h4>
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <p>
                  ${payment.amount.toFixed(2)} paid by {payment.paidBy}
                </p>
                <p className="text-sm text-gray-500">
                  Method: {payment.paymentMethod} | Date: {payment.date}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemovePayment(payment.id)}
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

export default PaymentsTab;
