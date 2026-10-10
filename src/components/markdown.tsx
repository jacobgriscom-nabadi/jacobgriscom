import Link from "next/link";
import ReactMarkdown from "react-markdown";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-jg">
      <ReactMarkdown
        components={{
          a({ href, children: label }) {
            if (!href) return <span>{label}</span>;
            if (href.startsWith("/")) return <Link href={href}>{label}</Link>;
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
