import type { StructureResolver } from "sanity/structure";

// Document types that should be treated as singletons
const SINGLETON_TYPES = new Set(["home", "footer", "gallery"]);

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton: Home Page
      S.listItem()
        .title("Home")
        .id("home")
        .child(
          S.document().schemaType("home").documentId("home").title("Home"),
        ),
      // Singleton: Gallery
      S.listItem()
        .title("Gallery")
        .id("gallery")
        .child(
          S.document()
            .schemaType("gallery")
            .documentId("gallery")
            .title("Gallery"),
        ),
      // Singleton: Footer
      S.listItem()
        .title("Footer")
        .id("footer")
        .child(
          S.document()
            .schemaType("footer")
            .documentId("footer")
            .title("Footer"),
        ),
      S.divider(),
      // All other document types (excluding the singletons above)
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.has(listItem.getId() ?? ""),
      ),
    ]);
