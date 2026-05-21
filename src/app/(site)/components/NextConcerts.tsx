import React from "react";
import { Concert } from "@/app/types";
import { client } from "@/sanity/client";
import { NEXT_CONCERT_QUERY } from "@/app/queries";
import Button from "./Button";

const today = new Date().toISOString().split("T")[0];

export default async function NextConcerts() {
  const concert = await client.fetch<Concert>(NEXT_CONCERT_QUERY, {
    today,
  });
  if (!concert) {
    return null;
  }
  return (
    <div className="p-4 relative rounded-2xl bg-sky-950">
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
