import { HOME_QUERY, NEXT_CONCERT_QUERY } from "../queries";
import { client, urlForImage } from "../../sanity/client";
import Image from "next/image";
import { Concert, HomePage } from "../types";
import PortableTextSection from "./components/PortableTextSection";
import InstagramComponent from "./components/InstagramComponent";
import Button from "./components/Button";
import NewsList from "./components/NewsList";
import NextConcerts from "./components/NextConcert";
import Link from "next/link";
import NextConcert from "./components/NextConcert";

const today = new Date().toISOString().split("T")[0];

export default async function IndexPage() {
  const home = await client.fetch<HomePage>(HOME_QUERY);
  const next_concert = await client.fetch<Concert>(NEXT_CONCERT_QUERY, {
    today,
  });

  return (
    <article className="flex flex-col items-center space-y-8 p-2">
      {home.image && (
        <Image
          src={urlForImage(home?.image).url()}
          alt="Home Image"
          width={600}
          height={400}
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

      {/* <section className="bg-sky-100 p-6 -mx-2">
        <h2>
          <Link href="/news">News</Link>
        </h2>
        <NewsList maxItems={3} />
      </section> */}

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
