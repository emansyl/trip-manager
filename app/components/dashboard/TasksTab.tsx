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
import { Task, TripDetails } from "~/types";

interface TasksTabProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tripDetails: TripDetails;
}

const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  setTasks,
  tripDetails,
}) => {
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "completedBy">>({
    description: "",
    assignedTo: [],
  });

  const handleAddTask = () => {
    if (newTask.description && newTask.assignedTo.length > 0) {
      const task: Task = {
        ...newTask,
        id: Date.now().toString(),
        completedBy: [],
      };
      setTasks((prev) => [...prev, task]);
      setNewTask({
        description: "",
        assignedTo: [],
      });
    }
  };

  const handleRemoveTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Tasks</CardTitle>
        <CardDescription>Add or remove trip tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <Input
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <div>
            <Label>Assigned to:</Label>
            {tripDetails.participants.map((participant) => (
              <div key={participant} className="flex items-center space-x-2">
                <Checkbox
                  id={`assign-${participant}`}
                  checked={newTask.assignedTo.includes(participant)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setNewTask((prev) => ({
                        ...prev,
                        assignedTo: [...prev.assignedTo, participant],
                      }));
                    } else {
                      setNewTask((prev) => ({
                        ...prev,
                        assignedTo: prev.assignedTo.filter(
                          (p) => p !== participant
                        ),
                      }));
                    }
                  }}
                />
                <Label htmlFor={`assign-${participant}`}>{participant}</Label>
              </div>
            ))}
          </div>
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Trip Tasks:</h4>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">
                  Assigned to: {task.assignedTo.join(", ")}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveTask(task.id)}
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

export default TasksTab;
