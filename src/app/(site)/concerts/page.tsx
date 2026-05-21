import React from "react";
import { client } from "@/sanity/client";
import {
  PREVIOUS_CONCERTS_QUERY,
  UPCOMING_CONCERTS_QUERY,
} from "@/app/queries";
import { Concert } from "../../types";
import { ConcertCard } from "../components/ConcertCard";

export default async function page() {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = await client.fetch<Concert[]>(UPCOMING_CONCERTS_QUERY, {
    today,
  });

  const previous = await client.fetch<Concert[]>(PREVIOUS_CONCERTS_QUERY, {
    today,
  });

  return (
    <article className="content">
      {upcoming.length > 0 && (
        <section>
          <h2>Upcoming concerts</h2>
          <ul>
            {upcoming.map((concert) => (
              <ConcertCard
                key={concert._id}
                concert={concert}
                upcoming={true}
              />
            ))}
          </ul>
          <br />
        </section>
      )}

      <br />
      <h2>Previous concerts</h2>
      {(() => {
        const concertsByYear = previous.reduce(
          (acc, concert) => {
            const year = new Date(concert.date).getFullYear();
            if (!acc[year]) acc[year] = [];
            acc[year].push(concert);
            return acc;
          },
          {} as Record<number, Concert[]>,
        );

        const years = Object.keys(concertsByYear)
          .map(Number)
          .sort((a, b) => b - a);

        return years.map((year) => (
          <div key={year}>
            <h3 className="mt-4 font-medium">{year}</h3>
            <ul>
              {concertsByYear[year].map((concert) => (
                <ConcertCard
                  key={concert._id}
                  concert={concert}
                  upcoming={false}
                />
              ))}
            </ul>
          </div>
        ));
      })()}
    </article>
  );
}
