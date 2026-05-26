import React from "react";
import { NewsItem } from "@/app/types";
import Link from "next/link";
import { client } from "@/sanity/client";
import { NEWS_QUERY } from "@/app/queries";
import SanityImage from "./SanityImage";

export default async function NewsList({ maxItems }: { maxItems?: number }) {
  const news = await client.fetch<NewsItem[]>(NEWS_QUERY, {
    today: new Date().toISOString(),
  });

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {news.slice(0, maxItems).map((item) => (
        <Link
          key={item._id}
          href={`/news/${item.slug.current}`}
          className="group"
        >
          <p className="text-gray-400 text-sm">
            {new Date(item.publishedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <h3 className="text-xl py-1 font-semibold">{item.title}</h3>
          {item.image && (
            <SanityImage
              image={item.image}
              alt={item.title}
              width={800}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full aspect-square object-cover group-hover:brightness-80 transition-brightness duration-300"
            />
          )}
          <p className="py-2">{item.excerpt}</p>
        </Link>
      ))}
    </ul>
  );
}
