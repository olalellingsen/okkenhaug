import { defineType, defineField } from "sanity";

export const albums = defineType({
  name: "albums",
  type: "document",
  title: "Albums",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Album Title",
    }),
    defineField({
      name: "artist",
      type: "reference",
      to: [{ type: "projects" }],
      title: "Conntect to Project",
    }),
    defineField({
      name: "otherArtist",
      type: "string",
      title: "Other Artist",
      description:
        "Use this field if the artist is not in the Projects collection",
    }),
    defineField({
      name: "discography",
      type: "boolean",
      title: "Include in Discography",
      description:
        "If checked, this album will be included in Eskild's discography page",
      initialValue: false,
      hidden: ({ parent }) => Boolean(parent?.artist),
    }),
    defineField({
      name: "okkenhaugRec",
      type: "boolean",
      title: "Include in Okkenhaug Records",
      description:
        "If checked, this album will be included in Okkenhaug Records",
      initialValue: false,
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
      discography: "discography",
      okkenhaugRec: "okkenhaugRec",
      hasArtist: "artist",
    },
    prepare(selection) {
      const { title, artist, coverArt, discography, okkenhaugRec, hasArtist } =
        selection;

      const tags = [
        (hasArtist || discography) && "Discography",
        okkenhaugRec && "Okkenhaug Records",
      ].filter(Boolean);

      const by = artist ? `by ${artist}` : selection.otherArtist;

      return {
        title: title,
        subtitle: [by, tags.length ? `[${tags.join(", ")}]` : "[not listed]"]
          .filter(Boolean)
          .join(" "),
        media: coverArt,
      };
    },
  },
});
