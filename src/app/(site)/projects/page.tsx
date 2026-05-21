import React from "react";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/app/queries";
import { Project } from "../../types";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import SliderList from "../components/SliderList";
import SliderItem from "../components/SliderItem";

export default async function page() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

  return (
    <article className="content">
      <h1>Projects</h1>

      <SliderList>
        {projects.map((project) => {
          return (
            <SliderItem key={project._id}>
              <Link href={`/projects/${project.slug.current}`}>
                {project.image && (
                  <Image
                    src={urlFor(project.image).url() || ""}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="aspect-3/4 lg:aspect-square object-cover rounded-2xl group-hover:opacity-70 transition-opacity duration-300"
                  />
                )}

                <h3 className="p-2 group-hover:underline">{project.title}</h3>
              </Link>
            </SliderItem>
          );
        })}
      </SliderList>
    </article>
  );
}
