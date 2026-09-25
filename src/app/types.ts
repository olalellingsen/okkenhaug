import { PortableTextBlock } from "@portabletext/react";
import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";

export type Project = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  body: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  image?: SanityImageObject;
  list_image?: SanityImageObject;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
};

export type Concert = {
  _id: string;
  band: string;
  date: string; // ISO date string
  time?: string;
  venue?: {
    name: string;
    locationLink: string;
  };
  ticketLink?: string;
};

export type Album = {
  _id: string;
  title: string;
  artist?: {
    title: string;
    slug: {
      current: string;
    };
  };
  otherArtist?: string;
  discography?: boolean;
  okkenhaugRec?: boolean;
  releaseDate: string;
  coverArt?: SanityImageSource;
  streamingLink: string;
};

export type HomePage = {
  _id: string;
  title: string;
  spotifyLink: string;
  richText: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  image?: SanityImageObject;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
};

export type RecordsPage = {
  _id: string;
  image?: SanityImageObject;
  richText: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
};

// Rich text block type
export type RichTextBlock = {
  _type: "richText";
  content: PortableTextBlock[];
};

export type Footer = {
  contactEmail: string;
  contactPhone: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
};

export type GalleryImage = {
  _key: string;
  photographer?: string;
  alt?: string;
  image: SanityImageObject & {
    asset?: {
      _id: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
      };
    };
  };
};

export type Gallery = {
  images?: GalleryImage[];
};

export type NewsItem = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string; // ISO date string
  image?: SanityImageObject;
  excerpt: string;
  content: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
};
