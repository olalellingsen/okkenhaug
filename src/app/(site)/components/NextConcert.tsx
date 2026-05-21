import React from "react";
import { Concert } from "@/app/types";
import Button from "./Button";

export default async function NextConcert({ concert }: { concert: Concert }) {
  return (
    <div className="p-4 relative border rounded-md">
      <div className="font-medium">
        {new Date(concert.date).toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        })}
      </div>

      <div className="text-gray-500">
        {concert.time ? `${concert.time}` : ""}
      </div>

      <div className="font-medium mr-20">{concert.band}</div>

      <div>
        {concert.venue?.locationLink ? (
          <Button href={concert.venue.locationLink} variant="link" external>
            {concert.venue.name}
          </Button>
        ) : (
          <p>{concert.venue?.name}</p>
        )}
      </div>

      {concert.ticketLink && (
        <Button
          size="sm"
          className="absolute top-5 right-4"
          href={concert.ticketLink}
          external
        >
          Tickets
        </Button>
      )}
    </div>
  );
}
