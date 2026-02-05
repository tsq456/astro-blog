import readingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const stats = readingTime(textOnPage);
    data.astro = data.astro || {};
    data.astro.frontmatter = data.astro.frontmatter || {};
    data.astro.frontmatter.readingTime = `约 ${stats.text}`;
  };
}
