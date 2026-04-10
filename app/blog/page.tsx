import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { getAllPosts } from "@/lib/posts";
import { getSiteConfig } from "@/lib/site";

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const site = getSiteConfig();

  return (
    <SiteChrome site={site}>
      {posts.length === 0 ? (
        <p>No posts yet. Add Markdown files under content/posts/.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="post-date">{post.dateLabel}</span>
              <Link href={`/blog/${post.slug}`} className="post-list-title">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SiteChrome>
  );
}
