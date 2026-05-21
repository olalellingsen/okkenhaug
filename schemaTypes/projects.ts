import { defineField, defineType } from "sanity";

export const projects = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order of Appearance",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "spotifyLink",
      title: "Spotify Link",
      type: "url",
      validation: (rule) => rule.uri({ allowRelative: true }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      order: "order",
    },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
