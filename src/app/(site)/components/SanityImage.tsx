import Image, { ImageProps } from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type {
  SanityImageSource,
  SanityImageObject,
} from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

type SanityImageProps = Omit<ImageProps, "src" | "placeholder"> & {
  /** A Sanity image source (the value of an `image`-type field). */
  image: SanityImageSource;
  /**
   * If true, render with `fill` and let the parent CSS dictate dimensions.
   * Otherwise, pass `width`/`height` like a normal next/image and the URL
   * will be cropped to those dimensions using the hotspot.
   */
  fill?: boolean;
};

/**
 * Hotspot- and crop-aware wrapper around next/image for Sanity images.
 *
 * The image-url builder applies the hotspot/crop set in Sanity Studio
 * automatically — but only when the URL has explicit dimensions and is
 * configured to crop. This component always passes width+height and
 * `fit('crop')`, so the hotspot is honored.
 *
 * Works in both server and client components (no hooks).
 */
export default function SanityImage({
  image,
  alt,
  fill,
  width,
  height,
  sizes,
  ...rest
}: SanityImageProps) {
  // Bail out if there's no usable image source. This handles:
  //   - undefined/null
  //   - empty objects ({})
  //   - image fields where the asset hasn't been uploaded yet
  if (!hasAssetReference(image)) return null;

  const dims = readDimensions(image);

  if (fill) {
    // Pick a reasonable target size for the URL (the displayed size is set by CSS).
    const targetWidth = 1600;
    const aspect = dims ? dims.width / dims.height : 16 / 9;
    const targetHeight = Math.round(targetWidth / aspect);

    const src = builder
      .image(image)
      .width(targetWidth)
      .height(targetHeight)
      .fit("crop")
      .auto("format")
      .url();

    return (
      <Image
        {...rest}
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
      />
    );
  }

  // Default to a sensible width if the caller didn't supply one
  const w = typeof width === "number" ? width : 1200;
  const h =
    typeof height === "number"
      ? height
      : dims
        ? Math.round((w * dims.height) / dims.width)
        : Math.round(w * (2 / 3));

  const src = builder
    .image(image)
    .width(w)
    .height(h)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
    />
  );
}

/**
 * Returns true if the source is something the image-url builder can resolve.
 * The builder needs at least an asset reference (or an expanded asset doc
 * with a url/_id). Without one it throws "Unable to resolve image URL from source".
 */
function hasAssetReference(source: unknown): source is SanityImageSource {
  if (!source || typeof source !== "object") return false;
  const obj = source as Record<string, unknown>;
  const asset = obj.asset as Record<string, unknown> | undefined;
  if (asset && (asset._ref || asset._id || asset.url)) return true;
  // The source can also be a bare asset doc, or an _id/_ref directly
  if (typeof obj._ref === "string" || typeof obj._id === "string") return true;
  return false;
}

function readDimensions(
  source: SanityImageSource,
): { width: number; height: number } | null {
  // Pull "<id>-<w>x<h>-<format>" out of asset._ref to derive native aspect
  const ref =
    (source as SanityImageObject)?.asset?._ref ??
    (typeof source === "object" && source && "_ref" in source
      ? (source as { _ref: string })._ref
      : undefined);
  if (!ref) return null;
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return null;
  return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) };
}
