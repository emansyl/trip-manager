import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { Link } from "@remix-run/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

const NavItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <Link
        to={props.href || "#"}
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
      </Link>
    </li>
  );
});
NavItem.displayName = "NavItem";
type NavItem = {
  href: string;
  title: string;
};

export default function Navbar({ navItems }: { navItems: NavItem[] }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Trip Manager</h1>
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} title={item.title}>
              {item.title}
            </NavItem>
          ))}
        </ul>
      </div>
      <TripSelector
        trips={["Summer Vacation", "Business Trip", "Family Reunion"]}
      />
      <div>
        <Button variant="outline">Login</Button>
      </div>
    </nav>
  );
}

function TripSelector({ trips }: { trips: string[] }) {
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {selectedTrip}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {trips.map((trip, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer"
            onClick={() => setSelectedTrip(trip)}
          >
            <Button
              variant={selectedTrip === trip ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {trip}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
