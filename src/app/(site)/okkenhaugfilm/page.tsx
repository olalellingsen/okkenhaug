import React from "react";
import { client } from "@/sanity/client";
import { OKKENHAUG_FILM_QUERY } from "@/app/queries";
import { FilmPage } from "@/app/types";
import PortableTextSection from "../components/PortableTextSection";
import SanityImage from "../components/SanityImage";
import Button from "../components/Button";

export default async function page() {
  const filmPage = await client.fetch<FilmPage>(OKKENHAUG_FILM_QUERY);

  return (
    <article className="content space-y-8">
      <h1>Okkenhaug Film</h1>

      {filmPage?.image && (
        <SanityImage
          image={filmPage.image}
          alt="Okkenhaug Records"
          width={1200}
          height={480}
          sizes="(max-width: 768px) 100vw, 1200px"
          className="w-full aspect-square object-cover sm:aspect-auto"
        />
      )}

      {filmPage?.promoVideo?.url && (
        <video
          className="w-full aspect-video bg-black"
          playsInline
          autoPlay
          muted
          preload="metadata"
        >
          <source
            src={filmPage.promoVideo.url}
            type={filmPage.promoVideo.mimeType}
          />
        </video>
      )}

      {filmPage?.richText && (
        <PortableTextSection
          content={{ _type: "richText", content: filmPage.richText }}
        />
      )}

      {filmPage?.socialLinks && filmPage.socialLinks.length > 0 && (
        <section className="flex flex-wrap gap-4">
          {filmPage.socialLinks.map((link) => (
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
