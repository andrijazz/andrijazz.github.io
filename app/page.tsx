import { SiteChrome } from "@/components/SiteChrome";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getHomeMarkdown } from "@/lib/home";
import { getSiteConfig } from "@/lib/site";

export default function HomePage() {
  const { body } = getHomeMarkdown();
  const site = getSiteConfig();

  return (
    <SiteChrome site={site}>
      <MarkdownBody markdown={body} className="home-body" />
    </SiteChrome>
  );
}
