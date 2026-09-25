import { defineField, defineType } from "sanity";

export const records = defineType({
  name: "records",
  title: "Okkenhaug Records",
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
      name: "richText",
      title: "Text",
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
  ],
  preview: {
    prepare() {
      return {
        title: "records",
      };
    },
  },
});
