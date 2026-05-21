import React from "react";
import Button from "./Button";
import { Concert } from "../../types";

interface ConcertCardProps {
  concert: Concert;
  upcoming: boolean;
}

export const ConcertCard = ({ concert, upcoming }: ConcertCardProps) => {
  return (
    <li
      className="
        border-b border-foreground/20 py-4
        grid lg:grid-cols-10 lg:items-center
        relative
      "
    >
      <div className="font-medium">
        {new Date(concert.date).toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        })}
      </div>

      <div className="text-gray-400">
        {concert.time ? `${concert.time}` : ""}
      </div>

      <div className="font-medium lg:col-span-5 mr-20 lg:mr-0">
        {concert.band}
      </div>

      <div className="lg:col-span-2">
        {concert.venue?.locationLink ? (
          <Button href={concert.venue.locationLink} variant="link">
            {concert.venue.name}
          </Button>
        ) : (
          <span>{concert.venue?.name}</span>
        )}
      </div>

      {concert.ticketLink && upcoming && (
        <Button
          size="sm"
          className="absolute top-5 right-2 lg:relative lg:top-0 lg:right-0 lg:justify-self-end"
          href={concert.ticketLink}
          external
        >
          Tickets
        </Button>
      )}
    </li>
  );
};
