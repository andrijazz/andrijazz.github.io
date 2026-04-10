import Link from "next/link";
import type { SiteConfig } from "@/lib/site";
import { hasSocialLinks } from "@/lib/site";
import { SocialLinks } from "./SocialLinks";

type Props = {
  children: React.ReactNode;
  site: SiteConfig;
};

export function SiteChrome({ children, site }: Props) {
  return (
    <div className="shell">
      <header className="site-header">
        <h1 className="site-title">Welcome</h1>
        <nav className="site-nav" aria-label="Primary">
          <Link href="/">Home</Link>
          <span className="nav-gap"> </span>
          <Link href="/blog">Blog</Link>
        </nav>
      </header>

      <main className="site-main">{children}</main>

      {hasSocialLinks(site) ? (
        <footer className="site-footer">
          <SocialLinks config={site} />
        </footer>
      ) : null}
    </div>
  );
}
