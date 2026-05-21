import { defineField, defineType } from "sanity";

export const concerts = defineType({
  name: "concerts",
  title: "Concerts",
  type: "document",
  fields: [
    defineField({
      name: "band",
      title: "Band Name / Artist",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "project",
      title: "Associated Project",
      type: "reference",
      to: [{ type: "projects" }],
    }),
    defineField({
      name: "date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "time",
      title: "Concert Time",
      type: "string",
      description: "Time of the concert in HH:MM format or TBA",
    }),
    defineField({
      name: "venue",
      type: "reference",
      to: [{ type: "venues" }],
    }),
    defineField({
      name: "ticketLink",
      title: "Ticket Link",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "band",
      date: "date",
      venue: "venue.name",
    },
    prepare(selection) {
      const { title, date, venue } = selection;
      return {
        title: title,
        subtitle: `${new Date(date).toLocaleDateString()} - ${venue || "Venue not specified"}`,
      };
    },
  },
  orderings: [
    {
      title: "Date",
      name: "dateAsc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
