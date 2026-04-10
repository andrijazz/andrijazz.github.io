import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

type Props = {
  markdown: string;
  className?: string;
};

export function MarkdownBody({ markdown, className }: Props) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
        components={{
          a: ({ node: _n, className, ...props }) => (
            <a {...props} className={className ?? "md-link"} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
