import { HOME_QUERY, NEXT_CONCERT_QUERY } from "../queries";
import { client } from "../../sanity/client";
import { Concert, HomePage } from "../types";
import PortableTextSection from "./components/PortableTextSection";
import InstagramComponent from "./components/InstagramComponent";
import Button from "./components/Button";
import NextConcert from "./components/NextConcert";
import SanityImage from "./components/SanityImage";
import NewsList from "./components/NewsList";

const today = new Date().toISOString().split("T")[0];

export default async function IndexPage() {
  const home = await client.fetch<HomePage>(HOME_QUERY);
  const next_concert = await client.fetch<Concert>(NEXT_CONCERT_QUERY, {
    today,
  });

  return (
    <article className="flex flex-col items-center space-y-8 p-2">
      {home.image && (
        <SanityImage
          image={home.image}
          alt="Home Image"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          className="w-full max-w-3xl"
        />
      )}

      {next_concert && (
        <section className="max-w-3xl w-full">
          <h2>Upcoming concerts</h2>
          <NextConcert concert={next_concert} />
          <Button href="/concerts" variant="link" className="mt-2">
            See all concerts
          </Button>
        </section>
      )}

      <section className="max-w-3xl w-full">
        <PortableTextSection
          content={{ _type: "richText", content: home.richText }}
        />
      </section>

      <section className="max-w-3xl w-full">
        <NewsList maxItems={3} />
      </section>

      <section className="w-full max-w-3xl">
        <InstagramComponent />
      </section>

      <section className="max-w-3xl w-full">
        <iframe
          className="w-full h-[480px]"
          data-testid="embed-iframe"
          src={home.spotifyLink}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        <Button href="/music" variant="link" className="mt-2">
          See discography
        </Button>
      </section>
    </article>
  );
}
