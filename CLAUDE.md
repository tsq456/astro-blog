# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个使用 Astro 构建的极简主义个人博客，内容由 Markdown 文件驱动，使用 Content Collections 进行类型安全的内容管理。

**技术栈**: Astro 4.15.0 + TypeScript + 原生 CSS + Content Collections

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 生产构建（输出到 dist/）
npm run build

# 预览生产构建
npm run preview
```

**要求**: Node.js 20+

## 核心架构

### 1. Content Collections 架构

所有博客文章存储在 `src/content/posts/*.md`，通过 `src/content/config.ts` 定义的 Zod schema 进行验证：

```typescript
{
  title: string,
  date: Date,
  category: string,
  readingTime?: string,  // 由 remark 插件自动注入
  draft?: boolean,       // true 时隐藏文章
  tags?: string[]
}
```

**关键点**:
- 使用 `getCollection("posts")` 获取所有文章
- 必须过滤草稿: `.filter((post) => !post.data.draft)`
- 按日期降序排序是标准做法

### 2. 路由系统（基于文件系统）

- **静态路由**: `/` (首页), `/archive` (归档), `/about` (关于), `/rss.xml` (RSS)
- **动态路由**:
  - `/blog/[slug]` → `src/pages/blog/[...slug].astro` (博客详情页)
  - `/category/[slug]` → `src/pages/category/[slug].astro` (分类页)

动态路由使用 `getStaticPaths()` 在构建时预渲染所有页面。

### 3. 数据处理管道

```
Markdown 文件
  ↓
Content Collections (类型验证)
  ↓
Remark 插件 (src/remark/reading-time.mjs) → 注入 readingTime
  ↓
工具函数处理:
  - src/utils/excerpt.ts → 生成摘要（剥离 Markdown 语法，截取 120 字符）
  - src/utils/slug.ts → 中文分类 slug 化（支持 Unicode \u4e00-\u9fa5）
  ↓
页面组件渲染
  ↓
静态 HTML 输出
```

### 4. 布局系统

**单一布局**: `src/layouts/Base.astro`

所有页面使用此布局，通过 props 控制行为：
- `title`: 页面标题
- `showTopbar`: 是否显示顶部导航栏
- `backHref` / `backLabel`: 返回按钮配置
- `contentClass`: 内容区域样式类

### 5. 样式架构

**全局样式**: `src/styles/theme.css`

**设计系统**:
- 主色调: `--ink` (深灰), `--accent` (橙红 #c85a2e), `--paper` (米黄 #f7f1e8)
- 字体组合: Spectral (衬线，标题) + Manrope (无衬线，正文)
- 响应式断点: 900px (平板), 820px (手机)

**样式模式**:
- 每个 `.astro` 文件使用 Scoped Styles
- 全局样式类: `.btn-pill`, `.card-link`, `.section-title`
- 卡片链接模式: 使用 `position: absolute` 覆盖整个卡片区域

### 6. 中文内容支持

- **分类 slug 化**: `slugifyCategory()` 支持中文字符和斜杠分隔符（如 "生活 / 观察" → "生活-观察"）
- **日期格式化**: 使用 `zh-CN` locale
- **阅读时间**: 由 `reading-time` 库自动计算并注入 frontmatter
  - 计算公式: `阅读时间（分钟）= 文本字符数 / 每分钟阅读字数`
  - 配置: 使用每分钟 300 字（中文标准），而非默认的 200 个单词（英文标准）
  - 位置: 在 `src/remark/reading-time.mjs` 中配置 `wordsPerMinute: 300`
  - 访问方式: 通过 `remarkPluginFrontmatter.readingTime` 获取（不在 `post.data` 中）
  - 调整建议: 如需调整阅读速度，修改 `wordsPerMinute` 参数（400-500 更快，200-250 更慢）

## 重要文件路径

| 功能 | 路径 |
|------|------|
| 内容模式定义 | `src/content/config.ts` |
| 博客文章 | `src/content/posts/*.md` |
| 全局布局 | `src/layouts/Base.astro` |
| 首页 | `src/pages/index.astro` |
| 博客详情页 | `src/pages/blog/[...slug].astro` |
| 分类页 | `src/pages/category/[slug].astro` |
| RSS Feed | `src/pages/rss.xml.js` |
| 全局样式 | `src/styles/theme.css` |
| 阅读时间插件 | `src/remark/reading-time.mjs` |
| 工具函数 | `src/utils/excerpt.ts`, `src/utils/slug.ts` |

## 部署

项目配置为部署到 Netlify：
- 构建命令: `npm run build`
- 发布目录: `dist`
- Node 版本: 20
- 配置文件: `netlify.toml`

## 内容创建

创建新文章时，在 `src/content/posts/` 下添加 `.md` 文件，frontmatter 格式：

```yaml
---
title: 文章标题
date: 2026-02-01
category: 分类名称
draft: false
tags:
  - 标签一
  - 标签二
---
```

**注意**:
- `readingTime` 会由 remark 插件自动生成，无需手动添加
- `draft: true` 会在所有列表页和 RSS 中隐藏文章
- 图片可使用 Unsplash URL（已在 `astro.config.mjs` 中配置白名单）
