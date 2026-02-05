import { defineConfig } from "astro/config";

const siteUrl = process.env.URL || "https://example.com";

export default defineConfig({
  site: siteUrl,
  image: {
    domains: ["images.unsplash.com"],
  },
});
