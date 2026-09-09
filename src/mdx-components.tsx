import type { MDXComponents } from "mdx/types";

// Prose styling is applied by the <Prose> wrapper around <MDXContent />,
// so element overrides here stay minimal.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
