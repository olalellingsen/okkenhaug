import { defineArrayMember, defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description:
        "Drag to reorder. Each image is shown in the gallery in this order.",
      of: [
        defineArrayMember({
          name: "galleryImage",
          title: "Image",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "photographer",
              title: "Photographer",
              type: "string",
              description: "Name shown below the image (and in fullscreen).",
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Optional. For accessibility / screen readers.",
            }),
          ],
          preview: {
            select: {
              media: "image",
              title: "photographer",
              subtitle: "alt",
            },
            prepare({ media, title, subtitle }) {
              return {
                media,
                title: title ? `Photo by ${title}` : "Untitled",
                subtitle,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Gallery" };
    },
  },
});
