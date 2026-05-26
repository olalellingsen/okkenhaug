import React from "react";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/app/queries";
import { Project } from "../../types";
import Link from "next/link";
import SliderList from "../components/SliderList";
import SliderItem from "../components/SliderItem";
import SanityImage from "../components/SanityImage";

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
                  <SanityImage
                    image={project.image}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 1024px) 80vw, 33vw"
                    className="aspect-3/4 lg:aspect-square object-cover group-hover:opacity-80 group-hover:blur-[3px] transition-all duration-400"
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
