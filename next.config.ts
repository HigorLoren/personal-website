import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Preview pane loads the dev server via 127.0.0.1; allow its HMR requests.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    // /sobre became a section of the home; keep shared links working.
    return [{ source: "/sobre", destination: "/#sobre", permanent: true }];
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    // Local, trusted SVG placeholders + screenshots live under /public.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
