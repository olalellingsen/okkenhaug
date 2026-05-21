import { client } from "@/sanity/client";
import React from "react";
import { Album } from "../../types";
import { ALBUMS_QUERY } from "../../queries";
import AlbumCard from "../components/AlbumCard";
import SliderList from "../components/SliderList";

export default async function page() {
  const albums = await client.fetch<Album[]>(ALBUMS_QUERY);

  return (
    <article className="content">
      <h1>Discography</h1>

      <SliderList>
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </SliderList>
    </article>
  );
}
