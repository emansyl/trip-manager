import React from "react";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { TripDetails } from "~/types";

interface TripDetailsTabProps {
  tripDetails: TripDetails;
  setTripDetails: React.Dispatch<React.SetStateAction<TripDetails>>;
}

const TripDetailsTab: React.FC<TripDetailsTabProps> = ({
  tripDetails,
  setTripDetails,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Details</CardTitle>
        <CardDescription>Manage general trip information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <Input
              placeholder="Destination"
              value={tripDetails.destination}
              onChange={(e) =>
                setTripDetails((prev) => ({
                  ...prev,
                  destination: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <Input
              type="date"
              value={tripDetails.startDate}
              onChange={(e) =>
                setTripDetails((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
            <span>to</span>
            <Input
              type="date"
              value={tripDetails.endDate}
              onChange={(e) =>
                setTripDetails((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripDetailsTab;
