import { client } from "@/sanity/client";
import { GALLERY_QUERY } from "@/app/queries";
import { Gallery } from "@/app/types";
import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Gallery — Eskild Okkenhaug",
};

export default async function GalleryPage() {
  const data = await client.fetch<Gallery | null>(GALLERY_QUERY);
  const images = (data?.images ?? []).filter((i) => i?.image?.asset);

  return (
    <article className="content">
      <h1 className="mb-6">Gallery</h1>

      {images.length === 0 ? (
        <p className="text-foreground/70">No images yet!</p>
      ) : (
        <GalleryClient images={images} />
      )}
    </article>
  );
}
