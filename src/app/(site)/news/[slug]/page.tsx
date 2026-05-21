import { client, urlForImage } from "@/sanity/client";
import Image from "next/image";
import React from "react";
import PortableTextSection from "../../components/PortableTextSection";
import Button from "../../components/Button";

export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: string }[]>(
    `*[_type == "news"]{ "slug": slug.current }`,
  );

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function newsItem({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsItem = await client.fetch(
    `*[_type == "news" && slug.current == $slug][0]`,
    { slug },
  );
  if (!newsItem) {
    return <div>News item not found</div>;
  }

  return (
    <div className="content">
      <Button href="/news" variant="link">
        &larr; Back to news
      </Button>
      {newsItem.image && (
        <Image
          src={urlForImage(newsItem.image).url()}
          alt={newsItem.title}
          width={600}
          height={400}
          className="group-hover:opacity-70 transition-opacity duration-300"
        />
      )}
      <h1>{newsItem.title}</h1>
      <p>
        {new Date(newsItem.publishedAt).toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="font-semibold max-w-xl">{newsItem.excerpt}</p>
      <PortableTextSection
        content={{ _type: "richText", content: newsItem.content }}
      />
    </div>
  );
}
