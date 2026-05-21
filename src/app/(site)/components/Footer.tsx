import { client } from "@/sanity/client";
import Link from "next/link";
import React from "react";
import type { Footer } from "../../types";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Music,
  Globe,
  type LucideIcon,
} from "lucide-react";
import SpotifyIcon from "@/../public/spotify-icon.png";
import Image from "next/image";

// Map platform names to icons
const platformIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  "apple music": Music,
  website: Globe,
};

export default async function Footer() {
  const footerData = await client.fetch<Footer>(`*[_type == "footer"][0]{
    contactEmail,
    contactPhone,
    socialLinks[]{
      platform,
      url
    }
  }`);

  return (
    <footer className="content w-full lg:mt-12">
      <div className="grid gap-4 md:flex justify-between">
        <div className="*:block">
          <h3>Contact</h3>
          {footerData?.contactEmail && (
            <p>
              <Link href={`mailto:${footerData.contactEmail}`}>
                {footerData.contactEmail}
              </Link>
            </p>
          )}
          {footerData?.contactPhone && (
            <p>
              <Link href={`tel:${footerData.contactPhone}`}>
                {footerData.contactPhone}
              </Link>
            </p>
          )}
        </div>

        <ul className="flex gap-4">
          {footerData?.socialLinks?.map((link) => {
            const Icon = platformIcons[link.platform.toLowerCase()] || Globe;
            const isSpotify = link.platform.toLowerCase() === "spotify";

            return (
              <li key={link.platform}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  aria-label={link.platform}
                >
                  {isSpotify ? (
                    <Image
                      src={SpotifyIcon.src}
                      alt="Spotify"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Icon size={24} strokeWidth={1} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="text-center mb-2 mt-8 text-gray-400">
        <Link href="/studio/" target="_blank">
          Studio
        </Link>
        <p className=" ">© {new Date().getFullYear()} Ola Lømo Ellingsen</p>
      </div>
    </footer>
  );
}
