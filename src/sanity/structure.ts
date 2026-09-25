import type { StructureResolver } from "sanity/structure";

// Document types that should be treated as singletons
const SINGLETON_TYPES = new Set(["home", "records", "film", "footer"]);

// Document types that shouldn't get their own entry in the Content list
// (e.g. supporting data managed via another document's reference field)
const HIDDEN_TYPES = new Set(["venues"]);

// Mirrors the public site nav order (Home, Projects, Discography, Concerts,
// Okkenhaug Records) for the non-singleton document types in between.
const DOCUMENT_TYPE_ORDER = ["projects", "albums", "concerts"];

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  const orderedDocumentTypeListItems = S.documentTypeListItems()
    .filter(
      (listItem) =>
        !SINGLETON_TYPES.has(listItem.getId() ?? "") &&
        !HIDDEN_TYPES.has(listItem.getId() ?? ""),
    )
    .sort((a, b) => {
      const indexOf = (id: string | undefined) => {
        const i = DOCUMENT_TYPE_ORDER.indexOf(id ?? "");
        return i === -1 ? DOCUMENT_TYPE_ORDER.length : i;
      };
      return indexOf(a.getId()) - indexOf(b.getId());
    });

  const albumsListItem = orderedDocumentTypeListItems
    .find((listItem) => listItem.getId() === "albums")
    ?.title("Discography");

  const otherListItems = orderedDocumentTypeListItems.filter(
    (listItem) => listItem.getId() !== "albums",
  );

  return S.list()
    .title("Content")
    .items([
      // Singleton: Home Page
      S.listItem()
        .title("Home")
        .id("home")
        .child(
          S.document().schemaType("home").documentId("home").title("Home"),
        ),
      // Projects
      ...otherListItems.filter((listItem) => listItem.getId() === "projects"),
      // Albums, relabeled to match the public "Discography" nav entry
      ...(albumsListItem ? [albumsListItem] : []),
      // Concerts
      ...otherListItems.filter((listItem) => listItem.getId() === "concerts"),
      // Singleton: Okkenhaug Records Page
      S.listItem()
        .title("Okkenhaug Records")
        .id("records")
        .child(
          S.document()
            .schemaType("records")
            .documentId("records")
            .title("Okkenhaug Records"),
        ),
      // Singleton: Film Page
      // S.listItem()
      //   .title("Okkenhaug Film")
      //   .id("film")
      //   .child(
      //     S.document()
      //       .schemaType("film")
      //       .documentId("film")
      //       .title("Okkenhaug Film"),
      //   ),

      // Any other document types not covered by the nav order above
      ...otherListItems.filter(
        (listItem) =>
          listItem.getId() !== "projects" && listItem.getId() !== "concerts",
      ),
      S.divider(),
      S.listItem()
        .title("Footer")
        .id("footer")
        .child(
          S.document()
            .schemaType("footer")
            .documentId("footer")
            .title("Footer"),
        ),
    ]);
};
