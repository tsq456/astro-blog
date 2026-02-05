import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/remark/reading-time.mjs";

const siteUrl = process.env.URL || "https://example.com";

export default defineConfig({
  site: siteUrl,
  image: {
    domains: ["images.unsplash.com"],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
