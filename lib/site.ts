/** Social URLs for the site footer. Edit `content/site.json`. */
import fs from "fs";
import path from "path";

export type SiteConfig = {
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    scholar?: string;
  };
};

const defaultConfig: SiteConfig = {
  social: {},
};

export function getSiteConfig(): SiteConfig {
  const p = path.join(process.cwd(), "content/site.json");
  if (!fs.existsSync(p)) return defaultConfig;
  try {
    const raw = fs.readFileSync(p, "utf8");
    const parsed = JSON.parse(raw) as SiteConfig;
    return {
      ...defaultConfig,
      ...parsed,
      social: { ...defaultConfig.social, ...parsed.social },
    };
  } catch {
    return defaultConfig;
  }
}

export function hasSocialLinks(site: SiteConfig): boolean {
  const s = site.social;
  return Boolean(s.github || s.twitter || s.linkedin || s.scholar);
}
