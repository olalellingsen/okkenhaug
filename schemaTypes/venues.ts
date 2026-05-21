import { defineField, defineType } from "sanity";

export const venues = defineType({
  name: "venues",
  title: "Venues",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Venue Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationLink",
      title: "Location Link",
      description: "Link to the venue on Google Maps or similar",
      type: "url",
    }),
  ],
});
