import { defineType, defineField } from "sanity";

export const albums = defineType({
  name: "albums",
  type: "document",
  title: "Albums",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "artist",
      type: "reference",
      to: [{ type: "projects" }],
      title: "Artist / Project",
    }),
    defineField({
      name: "otherArtist",
      type: "string",
      title: "Other Artist Name",
      description:
        "Use this field if the artist is not in the Projects collection",
    }),
    defineField({
      name: "releaseDate",
      type: "date",
      title: "Release Date",
    }),
    defineField({
      name: "coverArt",
      type: "image",
      title: "Cover Art",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "streamingLink",
      type: "string",
      title: "Streaming Link",
    }),
  ],
  orderings: [
    {
      title: "Release Date",
      name: "releaseDateDesc",
      by: [{ field: "releaseDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      artist: "artist.title",
      otherArtist: "otherArtist",
      coverArt: "coverArt",
    },
    prepare(selection) {
      const { title, artist, coverArt } = selection;
      return {
        title: title,
        subtitle: artist ? `by ${artist}` : `${selection.otherArtist}`,
        media: coverArt,
      };
    },
  },
});
