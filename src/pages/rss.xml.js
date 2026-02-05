import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { buildExcerpt } from "../utils/excerpt";
import { slugifyCategory } from "../utils/slug";

export async function GET(context) {
  const posts = await getCollection("posts");
  const items = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: buildExcerpt(post.body),
      link: `/blog/${post.slug}`,
    }));

  return rss({
    title: "个人博客",
    description: "记录长期主义者的生活与思考",
    site: context.site,
    items,
  });
}
