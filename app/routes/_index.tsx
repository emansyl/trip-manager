import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Checkbox } from "~/components/ui/checkbox";
import { useState } from "react";

import { Input } from "~/components/ui/input";

import { Label } from "~/components/ui/label";
import {
  Plane,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  CreditCard,
  Receipt,
} from "lucide-react";
import AdminDashboard from "~/components/AdminDashboard";

interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  participants: string[];
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

interface FinancialInfo {
  expenses: Expense[];
}

interface Task {
  id: string;
  description: string;
  assignedTo: string[];
  completedBy: string[];
}

const initialTripDetails: TripDetails = {
  destination: "Paris, France",
  startDate: "2023-09-01",
  endDate: "2023-09-07",
  participants: ["Alice", "Bob", "Charlie", "David"],
};

const initialFinancialInfo: FinancialInfo = {
  expenses: [
    {
      id: "1",
      description: "Hotel Booking",
      amount: 800.0,
      paidBy: "Alice",
      splitBetween: ["Alice", "Bob", "Charlie", "David"],
    },
    {
      id: "2",
      description: "Group Dinner",
      amount: 120.0,
      paidBy: "Bob",
      splitBetween: ["Alice", "Bob", "Charlie", "David"],
    },
    {
      id: "3",
      description: "Museum Tickets",
      amount: 60.0,
      paidBy: "Charlie",
      splitBetween: ["Alice", "Bob", "Charlie"],
    },
  ],
};

const initialTasks: Task[] = [
  {
    id: "1",
    description: "Pack suitcase",
    assignedTo: ["Alice", "Bob", "Charlie", "David"],
    completedBy: [],
  },
  {
    id: "2",
    description: "Book airport transfer",
    assignedTo: ["Alice"],
    completedBy: ["Alice"],
  },
  {
    id: "3",
    description: "Exchange currency",
    assignedTo: ["Bob", "Charlie"],
    completedBy: ["Bob"],
  },
];

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tripDetails, setTripDetails] =
    useState<TripDetails>(initialTripDetails);
  const [financialInfo, setFinancialInfo] =
    useState<FinancialInfo>(initialFinancialInfo);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setIsAdmin(username === "admin"); // Simple admin check
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername("");
    setPassword("");
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const isCompleted = task.completedBy.includes(username);
          const updatedCompletedBy = isCompleted
            ? task.completedBy.filter((user) => user !== username)
            : [...task.completedBy, username];
          return { ...task, completedBy: updatedCompletedBy };
        }
        return task;
      })
    );
  };

  const calculateUserFinances = () => {
    let moneyOwed = 0;
    let paymentsMade = 0;

    financialInfo.expenses.forEach((expense) => {
      if (expense.splitBetween.includes(username)) {
        const splitAmount = expense.amount / expense.splitBetween.length;
        if (expense.paidBy === username) {
          paymentsMade += expense.amount - splitAmount;
        } else {
          moneyOwed += splitAmount;
        }
      }
    });

    return { moneyOwed, paymentsMade };
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Group Trip Manager
        </h1>
        <Card className="w-[350px] mx-auto">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to view trip details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin}>
              Log in
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <AdminDashboard
        tripDetails={tripDetails}
        setTripDetails={setTripDetails}
        financialInfo={financialInfo}
        setFinancialInfo={setFinancialInfo}
        tasks={tasks}
        setTasks={setTasks}
        onLogout={handleLogout}
      />
    );
  }

  const { moneyOwed, paymentsMade } = calculateUserFinances();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Group Trip Manager</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trip to {tripDetails.destination}</CardTitle>
            <CardDescription>General trip information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{tripDetails.destination}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>
                {tripDetails.startDate} to {tripDetails.endDate}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{tripDetails.participants.length} participants</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Trip Details</CardTitle>
            <CardDescription>Information specific to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Plane className="h-4 w-4" />
              <span>Flight: AB123</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Check-in: 2023-09-01 14:00</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Your expenses and payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-red-500" />
                  <span>Money Owed:</span>
                </div>
                <span className="font-semibold">${moneyOwed.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  <span>Payments Made:</span>
                </div>
                <span className="font-semibold">
                  ${paymentsMade.toFixed(2)}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <Receipt className="h-4 w-4" />
                <span>Shared Expenses:</span>
              </h4>
              <ul className="space-y-1">
                {financialInfo.expenses
                  .filter((expense) => expense.splitBetween.includes(username))
                  .map((expense) => (
                    <li key={expense.id} className="flex justify-between">
                      <span>{expense.description}</span>
                      <span>
                        $
                        {(expense.amount / expense.splitBetween.length).toFixed(
                          2
                        )}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Your assigned tasks for the trip</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tasks
                .filter((task) => task.assignedTo.includes(username))
                .map((task) => (
                  <li key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={task.id}
                      checked={task.completedBy.includes(username)}
                      onCheckedChange={() => handleToggleTask(task.id)}
                    />
                    <label
                      htmlFor={task.id}
                      className={`flex-grow ${
                        task.completedBy.includes(username)
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {task.description}
                    </label>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Index;
