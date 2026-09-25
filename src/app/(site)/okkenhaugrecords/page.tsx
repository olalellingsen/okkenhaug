import React from "react";
import { client } from "@/sanity/client";
import {
  OKKENHAUG_RECORDS_ALBUMS_QUERY,
  RECORDS_PAGE_QUERY,
} from "@/app/queries";
import { Album, RecordsPage } from "@/app/types";
import AlbumCard from "../components/AlbumCard";
import SliderList from "../components/SliderList";
import PortableTextSection from "../components/PortableTextSection";
import SanityImage from "../components/SanityImage";
import Button from "../components/Button";

export default async function page() {
  const records = await client.fetch<RecordsPage>(RECORDS_PAGE_QUERY);
  const albums = await client.fetch<Album[]>(OKKENHAUG_RECORDS_ALBUMS_QUERY);

  return (
    <article className="content space-y-8">
      <h1>Okkenhaug Records</h1>

      {records?.image && (
        <SanityImage
          image={records.image}
          alt="Okkenhaug Records"
          width={1200}
          height={480}
          sizes="(max-width: 768px) 100vw, 1200px"
          className="w-full aspect-square object-cover sm:aspect-auto"
        />
      )}

      {records?.richText && (
        <PortableTextSection
          content={{ _type: "richText", content: records.richText }}
        />
      )}

      {albums.length > 0 && (
        <section>
          <h2>Releases</h2>
          <SliderList>
            {albums.map((album) => (
              <AlbumCard key={album._id} album={album} />
            ))}
          </SliderList>
        </section>
      )}

      {records?.socialLinks && records.socialLinks.length > 0 && (
        <section className="flex flex-wrap gap-4">
          {records.socialLinks.map((link) => (
            <Button
              key={link.platform}
              href={link.url}
              external
              variant="outline"
            >
              {link.platform}
            </Button>
          ))}
        </section>
      )}
    </article>
  );
}
