import { Album } from "@/app/types";
import React from "react";
import Link from "next/link";
import Button from "./Button";
import SliderItem from "./SliderItem";
import SanityImage from "./SanityImage";

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <SliderItem>
      {album.coverArt && (
        <Link
          href={album.streamingLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SanityImage
            image={album.coverArt}
            alt={album.title}
            width={500}
            height={500}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="w-full group-hover:opacity-70 transition-opacity duration-300"
          />
        </Link>
      )}
      <div className="p-2 flex flex-col items-center text-center">
        <h3>{album.title}</h3>

        {new Date(album.releaseDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}

        {album.artist ? (
          <Button
            href={`/projects/${album.artist.slug.current}`}
            variant="link"
          >
            {album.artist.title}
          </Button>
        ) : (
          album.otherArtist
        )}

        {album.streamingLink && (
          <Button href={album.streamingLink} external className="my-2">
            Listen here!
          </Button>
        )}
      </div>
    </SliderItem>
  );
}
