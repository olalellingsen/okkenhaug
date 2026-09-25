import { albums } from "./albums";
import { concerts } from "./concerts";
import { footerSchema } from "./footer";
import { home } from "./home";
// import { film } from "./film";
import { records } from "./records";
import { projects } from "./projects";
import { venues } from "./venues";

export const schemaTypes = [
  home,
  records,
  // film,
  projects,
  albums,
  concerts,
  venues,
  footerSchema,
];

export const schema = { types: schemaTypes };
