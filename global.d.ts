// Allow side-effect CSS imports (e.g. `import "./globals.css"`)
declare module "*.css";

// Allow CSS Module imports (e.g. `import styles from "./foo.module.css"`)
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
