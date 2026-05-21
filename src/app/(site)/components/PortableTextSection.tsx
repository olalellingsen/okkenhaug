import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { RichTextBlock } from "../../types";
import Button from "./Button";
import { ExternalLink } from "lucide-react";

// Type for image values in portable text
type ImageValue = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
};

// Type for mark definitions (like links)
type MarkValue = {
  href?: string;
};

const stylings: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => (
      <figure className="my-6">
        <Image
          src={urlForImage(value).url()}
          alt={value.alt || ""}
          width={800}
          height={600}
          className="aspect-square sm:aspect-video object-cover w-full"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-3">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-3">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-foreground">{children}</li>,
    number: ({ children }) => <li className="text-foreground">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: MarkValue;
    }) => (
      <Button
        href={value?.href || "#"}
        variant="link"
        className="text-foreground inline-flex"
      >
        {children}
        <ExternalLink className="ml-1 mt-1 size-4" />
      </Button>
    ),
  },
};

export default function PortableTextSection({
  content,
}: {
  content: RichTextBlock;
}) {
  // Handle both RichTextBlock format and direct array of blocks
  const blocks = Array.isArray(content) ? content : content.content;

  return (
    <div className="prose lg:prose-lg max-w-none prose-headings:text-foreground prose-headings:font-light prose-p:text-foreground prose-blockquote:text-foreground prose-strong:text-foreground">
      <PortableText value={blocks} components={stylings} />
    </div>
  );
}
