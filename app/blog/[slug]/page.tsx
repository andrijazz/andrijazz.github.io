import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { getSiteConfig } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not found" };
  return { title: post.title };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const site = getSiteConfig();

  return (
    <SiteChrome site={site}>
      <article>
        <h1 className="post-page-title">{post.title}</h1>
        <p className="post-page-date">{post.dateLabel}</p>
        <MarkdownBody markdown={post.content} className="post-body" />
      </article>
    </SiteChrome>
  );
}
