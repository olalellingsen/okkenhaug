import React from "react";
import { client, urlForImage } from "@/sanity/client";
import {
  PROJECT_ALBUMS_QUERY,
  PROJECT_QUERY,
  PROJECT_UPCOMING_CONCERTS_QUERY,
} from "@/app/queries";
import Image from "next/image";
import { Album, Concert, Project } from "../../../types";
import Button from "../../components/Button";
import { ConcertCard } from "../../components/ConcertCard";
import Link from "next/link";
import PortableTextSection from "../../components/PortableTextSection";

export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: string }[]>(
    `*[_type == "project"]{ "slug": slug.current }`,
  );

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch<Project>(PROJECT_QUERY, { slug });
  if (!project) {
    return <div>Project not found</div>;
  }
  const upcomingConcerts = await client.fetch<Concert[]>(
    PROJECT_UPCOMING_CONCERTS_QUERY,
    { projectId: project._id },
  );

  const projectAlbums = await client.fetch<Album[]>(PROJECT_ALBUMS_QUERY, {
    projectId: project._id,
  });

  return (
    <main className="content">
      <Button href="/projects" variant="link" className="mb-2">
        &larr; Back to projects
      </Button>
      {project.image && (
        <Image
          src={urlForImage(project.image).url()}
          alt={project.title}
          width={1200}
          height={600}
          className="w-full aspect-square md:aspect-5/2 object-cover"
        />
      )}

      <article className="space-y-12 py-2">
        <h1>{project.title}</h1>

        {project.body && (
          <section>
            <PortableTextSection
              content={{ _type: "richText", content: project.body }}
            />
          </section>
        )}
        {upcomingConcerts.length > 0 && (
          <section>
            <h2>Upcoming concerts</h2>
            <ul>
              {upcomingConcerts.map((concert) => (
                <ConcertCard
                  key={concert._id}
                  concert={concert}
                  upcoming={true}
                />
              ))}
            </ul>
          </section>
        )}

        {projectAlbums.length > 0 && (
          <section>
            <h2>Albums</h2>
            <ul className="space-y-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {projectAlbums.map((album) => (
                <li key={album._id} className="group">
                  <Link
                    href={album.streamingLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {album.coverArt && (
                      <Image
                        src={urlForImage(album.coverArt).url()}
                        alt={album.title}
                        width={400}
                        height={400}
                        className="group-hover:opacity-80 transition"
                      />
                    )}
                    <h3 className="text-center">{album.title}</h3>
                    <p className="text-center">
                      {new Date(album.releaseDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.spotifyLink && (
          <Button href={project.spotifyLink || "#"}>Listen on Spotify</Button>
        )}
      </article>
    </main>
  );
}
