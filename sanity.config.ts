"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./schemaTypes";
import { structure } from "./src/sanity/structure";

// Document types that are managed as singletons
const SINGLETON_TYPES = new Set(["home", "footer", "gallery"]);

// Actions that should not be available on singleton documents
const SINGLETON_DISABLED_ACTIONS = new Set([
  "create",
  "duplicate",
  "delete",
  "unpublish",
]);

export default defineConfig({
  name: "okkenhaug",
  title: "Eskild Okkenhaug",
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    // Prevent create / duplicate / delete on singleton documents
    actions: (input, context) => {
      if (SINGLETON_TYPES.has(context.schemaType)) {
        return input.filter(
          ({ action }) => !action || !SINGLETON_DISABLED_ACTIONS.has(action),
        );
      }
      return input;
    },
    // Hide singletons from "create new" UI everywhere
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => !SINGLETON_TYPES.has(templateItem.templateId),
        );
      }
      return prev;
    },
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
