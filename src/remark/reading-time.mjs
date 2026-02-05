import readingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    // 中文阅读速度：每分钟约 300-400 字
    // 这里使用 300 作为基准，可以根据需要调整
    const stats = readingTime(textOnPage, { wordsPerMinute: 300 });

    // 初始化对象
    if (!data.astro) {
      data.astro = {};
    }
    if (!data.astro.frontmatter) {
      data.astro.frontmatter = {};
    }

    // 将阅读时间转换为中文格式
    const minutes = Math.ceil(stats.minutes);
    data.astro.frontmatter.readingTime = `${minutes} 分钟`;
  };
}
