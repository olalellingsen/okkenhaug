import { client } from "@/sanity/client";
import React from "react";
import PortableTextSection from "../../components/PortableTextSection";
import Button from "../../components/Button";
import SanityImage from "../../components/SanityImage";

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
    <div className="content space-y-2">
      <Button href="/news" variant="link">
        &larr; Back to news
      </Button>
      {newsItem.image && (
        <SanityImage
          image={newsItem.image}
          alt={newsItem.title}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 800px"
          className="group-hover:opacity-70 transition-opacity duration-300 aspect-square sm:aspect-[8/3] object-cover"
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
