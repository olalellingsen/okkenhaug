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
      title: "Main project image",
      description: "This image will be used at the top of the project page.",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "list_image",
      title: "Overview image",
      description: "This image will be used in the projects overview (square)",
      type: "image",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "list_image",
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
