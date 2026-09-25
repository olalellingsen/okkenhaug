import groq from "groq";

export const PROJECTS_QUERY = groq`
*[_type == "projects"] | order(order asc) {
  _id,
  title,
  description,
  slug {
    current
  },
  image {
    asset -> {
      _id,
      url,
      metadata
    }
  },
  list_image {
    _type,
    asset,
  },
  spotifyLink,
  members
}`;

export const PROJECT_QUERY = groq`*[_type == "projects" && slug.current == $slug][0]{
  _id,
  title,
  body,
  slug {
    current
  },
  image {
    _type,
    asset,
    hotspot,
    crop
  },
  socialLinks
}`;

export const PROJECT_UPCOMING_CONCERTS_QUERY = groq`*[_type == "concerts" && project._ref == $projectId && date >= now()] | order(date asc){
      _id,
      band,
      date,
      time,
      venue->{
        name,
        locationLink
      },
      ticketLink,
    }`;

export const PROJECT_ALBUMS_QUERY = groq`*[_type == "albums" && artist._ref == $projectId] | order(releaseDate desc) {
  _id,
  title,
  artist->{
    title,
    slug
  },
  otherArtist,
  releaseDate,
  coverArt,
  streamingLink
}`;

export const UPCOMING_CONCERTS_QUERY = groq`*[_type == "concerts" && date >= $today] | order(date asc){
  _id,
  band,
  date,
  time,
  venue->{
    name,
    locationLink
  },
  ticketLink,
}`;

export const PREVIOUS_CONCERTS_QUERY = groq`*[_type == "concerts" && date < $today] | order(date desc){
    _id,
    band,
    date,
    venue->{
      name
    }
  }`;

export const NEXT_CONCERT_QUERY = groq`*[_type == "concerts" && date >= $today] | order(date asc)[0]{
  _id,
  band,
  date,
  time,
  venue->{
    name,
    locationLink
  },
  ticketLink,
}`;

export const HOME_QUERY = groq`*[_type == "home"][0]{
  _id,
  title,
  richText,
  spotifyLink,
  image,
  socialLinks {
    platform,
    url
  }
}`;

export const GALLERY_QUERY = groq`*[_type == "gallery"][0]{
  images[]{
    _key,
    photographer,
    alt,
    image{
      ...,
      asset->{
        _id,
        metadata { dimensions }
      }
    }
  }
}`;

export const ALBUMS_QUERY = groq`*[_type == "albums" && (defined(artist) || discography == true)] | order(releaseDate desc) {
  _id,
  title,
  artist->{
    title,
    slug
  },
  otherArtist,
  releaseDate,
  coverArt,
  streamingLink
}`;

export const OKKENHAUG_RECORDS_ALBUMS_QUERY = groq`*[_type == "albums" && okkenhaugRec == true] | order(releaseDate desc) {
  _id,
  title,
  artist->{
    title,
    slug
  },
  otherArtist,
  releaseDate,
  coverArt,
  streamingLink
}`;

export const RECORDS_PAGE_QUERY = groq`*[_type == "records"][0]{
  _id,
  image,
  richText,
  socialLinks {
    platform,
    url
  }
}`;

export const NEWS_QUERY = groq`*[_type == "news" && publishedAt <= $today] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    image,
    excerpt,
    content
}`;
