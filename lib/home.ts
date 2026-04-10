import fs from "fs";
import path from "path";
import matter from "gray-matter";

const homePath = path.join(process.cwd(), "content/home.md");

export type HomeContent = {
  body: string;
};

export function getHomeMarkdown(): HomeContent {
  if (!fs.existsSync(homePath)) {
    return { body: "_Add `content/home.md` to edit this section._" };
  }
  const raw = fs.readFileSync(homePath, "utf8");
  const { content } = matter(raw);
  return { body: content.trimEnd() };
}
