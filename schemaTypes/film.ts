import { defineField, defineType } from "sanity";

export const film = defineType({
  name: "film",
  title: "Okkenhaug Film",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "promoVideo",
      title: "Promo Video",
      type: "file",
      description:
        "Upload a video file (MP4 recommended). Keep the file size small for faster loading.",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "richText",
      title: "Rich Text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
      ],
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
    prepare() {
      return {
        title: "film",
      };
    },
  },
});
