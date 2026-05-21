"use client";

import React from "react";
import dynamic from "next/dynamic";

const InstagramEmbed = dynamic(
  () => import("react-social-media-embed").then((mod) => mod.InstagramEmbed),
  { ssr: false },
);

export default function InstagramComponent() {
  return <InstagramEmbed url="https://www.instagram.com/olalellingsen/" />;
}
