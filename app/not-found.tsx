import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { getSiteConfig } from "@/lib/site";

export default function NotFound() {
  const site = getSiteConfig();

  return (
    <SiteChrome site={site}>
      <p>Page not found.</p>
      <p>
        <Link href="/" className="md-link">
          Back home
        </Link>
      </p>
    </SiteChrome>
  );
}
