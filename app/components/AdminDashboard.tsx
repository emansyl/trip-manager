import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TripDetails, FinancialInfo, Task, Payment } from "~/types";
import ExpensesTab from "./dashboard/ExpensesTab";
import ParticipantsTab from "./dashboard/ParticipantsTab";
import PaymentsTab from "./dashboard/PaymentsTab";
import TasksTab from "./dashboard/TasksTab";
import TripDetailsTab from "./dashboard/TripDetailsTab";

interface AdminDashboardProps {
  tripDetails: TripDetails;
  setTripDetails: React.Dispatch<React.SetStateAction<TripDetails>>;
  financialInfo: FinancialInfo;
  setFinancialInfo: React.Dispatch<React.SetStateAction<FinancialInfo>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  tripDetails,
  setTripDetails,
  financialInfo,
  setFinancialInfo,
  tasks,
  setTasks,
  onLogout,
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </div>
      <Tabs defaultValue="trip-details" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trip-details">Trip Details</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="trip-details">
          <TripDetailsTab
            tripDetails={tripDetails}
            setTripDetails={setTripDetails}
          />
        </TabsContent>
        <TabsContent value="participants">
          <ParticipantsTab
            tripDetails={tripDetails}
            setTripDetails={setTripDetails}
          />
        </TabsContent>
        <TabsContent value="expenses">
          <ExpensesTab
            financialInfo={financialInfo}
            setFinancialInfo={setFinancialInfo}
            tripDetails={tripDetails}
          />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentsTab
            payments={payments}
            setPayments={setPayments}
            tripDetails={tripDetails}
          />
        </TabsContent>
        <TabsContent value="tasks">
          <TasksTab
            tasks={tasks}
            setTasks={setTasks}
            tripDetails={tripDetails}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
