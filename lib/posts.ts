import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formatPostDate } from "./date";

const postsDir = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  date: string;
};

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
};

export type PostDocument = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  content: string;
};

function parseDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return new Date().toISOString().slice(0, 10);
}

function readFrontmatter(raw: string): PostFrontmatter {
  const { data } = matter(raw);
  const title = typeof data.title === "string" ? data.title : "Untitled";
  const date = parseDate(data.date);
  return { title, date };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostListItem[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const full = path.join(postsDir, `${slug}.md`);
    const raw = fs.readFileSync(full, "utf8");
    const { title, date } = readFrontmatter(raw);
    return {
      slug,
      title,
      date,
      dateLabel: formatPostDate(date),
    };
  });
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): PostDocument | null {
  const full = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { content, data } = matter(raw);
  const title =
    typeof data.title === "string" ? data.title : "Untitled";
  const date = parseDate(data.date);
  return {
    slug,
    title,
    date,
    dateLabel: formatPostDate(date),
    content,
  };
}
