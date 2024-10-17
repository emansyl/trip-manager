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
import { TripDetails } from "~/types";

interface ParticipantsTabProps {
  tripDetails: TripDetails;
  setTripDetails: React.Dispatch<React.SetStateAction<TripDetails>>;
}

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({
  tripDetails,
  setTripDetails,
}) => {
  const [newParticipant, setNewParticipant] = useState("");

  const handleAddParticipant = () => {
    if (newParticipant && !tripDetails.participants.includes(newParticipant)) {
      setTripDetails((prev) => ({
        ...prev,
        participants: [...prev.participants, newParticipant],
      }));
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (participant: string) => {
    setTripDetails((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p !== participant),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Participants</CardTitle>
        <CardDescription>Add or remove trip participants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="New participant name"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
          />
          <Button onClick={handleAddParticipant}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tripDetails.participants.map((participant) => (
            <li key={participant} className="flex justify-between items-center">
              <span>{participant}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveParticipant(participant)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ParticipantsTab;
