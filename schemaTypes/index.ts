import { albums } from "./albums";
import { concerts } from "./concerts";
import { footerSchema } from "./footer";
import { home } from "./home";
import { news } from "./news";
import { projects } from "./projects";
import { venues } from "./venues";

export const schemaTypes = [
  home,
  news,
  projects,
  albums,
  concerts,
  venues,
  footerSchema,
];

export const schema = { types: schemaTypes };
