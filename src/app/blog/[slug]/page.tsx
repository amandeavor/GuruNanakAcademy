import { Metadata } from 'next';
import { PremiumGradientPlaceholder } from '@/components/shared/image-placeholder';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { SCHOOL_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ slug: string }>;
};

function MarkdownParser({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let currentTable: { headers: string[]; rows: string[][] } | null = null;
  let inBlockquote = false;
  let blockquoteLines: string[] = [];

  const renderList = (list: { type: 'ul' | 'ol'; items: string[] }, key: number) => {
    const ListTag = list.type;
    return (
      <ListTag
        key={`list-${key}`}
        className={
          list.type === 'ul' ? 'my-4 list-disc space-y-1 pl-5' : 'my-4 list-decimal space-y-1 pl-5'
        }
      >
        {list.items.map((item, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
        ))}
      </ListTag>
    );
  };

  const renderTable = (table: { headers: string[]; rows: string[][] }, key: number) => (
    <div
      key={`table-wrapper-${key}`}
      className="my-6 overflow-x-auto rounded-lg border border-border shadow-sm"
    >
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted/50">
          <tr>
            {table.headers.map((h, idx) => (
              <th
                key={idx}
                className="border-b border-border px-4 py-3 text-left font-semibold text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {table.rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-muted/30">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className="px-4 py-3 text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderBlockquote = (lines: string[], key: number) => (
    <blockquote
      key={`quote-${key}`}
      className="my-4 rounded-r-lg border-l-4 border-primary bg-muted/20 py-2 pl-4 italic text-muted-foreground"
    >
      {lines.map((line, idx) => (
        <p
          key={idx}
          className="mb-2 last:mb-0"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      ))}
    </blockquote>
  );

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(
        /`(.*?)`/g,
        '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">$1</code>'
      )
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" class="text-primary underline hover:text-primary/80">$1</a>'
      );
  };

  let keyCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    keyCounter++;

    if (line.match(/^\|?\s*:?-+:?\s*\|/) && currentTable) {
      continue;
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line
        .split('|')
        .map((c) => c.trim())
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (!currentTable) {
        currentTable = { headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    } else if (currentTable) {
      elements.push(renderTable(currentTable, keyCounter));
      currentTable = null;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const item = line.substring(2);
      if (!currentList) {
        currentList = { type: 'ul', items: [item] };
      } else if (currentList.type === 'ol') {
        elements.push(renderList(currentList, keyCounter));
        currentList = { type: 'ul', items: [item] };
      } else {
        currentList.items.push(item);
      }
      continue;
    }

    if (line.match(/^\d+\.\s+/)) {
      const match = line.match(/^\d+\.\s+(.*)/);
      const item = match ? match[1] : '';
      if (!currentList) {
        currentList = { type: 'ol', items: [item] };
      } else if (currentList.type === 'ul') {
        elements.push(renderList(currentList, keyCounter));
        currentList = { type: 'ol', items: [item] };
      } else {
        currentList.items.push(item);
      }
      continue;
    }

    if (currentList && line === '') {
      elements.push(renderList(currentList, keyCounter));
      currentList = null;
    }

    if (line.startsWith('>') || line.startsWith('»')) {
      const text = line.substring(1).trim();
      inBlockquote = true;
      blockquoteLines.push(text);
      continue;
    } else if (inBlockquote && line !== '') {
      blockquoteLines.push(line);
      continue;
    } else if (inBlockquote && line === '') {
      elements.push(renderBlockquote(blockquoteLines, keyCounter));
      inBlockquote = false;
      blockquoteLines = [];
    }

    if (line === '') continue;

    if (line.startsWith('###### ')) {
      elements.push(
        <h6 key={keyCounter} className="my-4 text-sm font-bold">
          {formatInline(line.substring(7))}
        </h6>
      );
    } else if (line.startsWith('##### ')) {
      elements.push(
        <h5 key={keyCounter} className="my-4 text-base font-bold">
          {formatInline(line.substring(6))}
        </h5>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={keyCounter} className="my-4 text-lg font-bold">
          {formatInline(line.substring(5))}
        </h4>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={keyCounter} className="my-4 text-xl font-bold">
          {formatInline(line.substring(4))}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={keyCounter} className="my-4 text-2xl font-bold">
          {formatInline(line.substring(3))}
        </h2>
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={keyCounter} className="my-4 text-3xl font-bold">
          {formatInline(line.substring(2))}
        </h1>
      );
    } else {
      elements.push(
        <p
          key={keyCounter}
          className="mb-4 leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
  }

  if (currentList) {
    elements.push(renderList(currentList, keyCounter));
  }
  if (currentTable) {
    elements.push(renderTable(currentTable, keyCounter));
  }
  if (inBlockquote) {
    elements.push(renderBlockquote(blockquoteLines, keyCounter));
  }

  return <>{elements}</>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SCHOOL_INFO.name}`,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.image ? [post.image] : undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="pt-20">
      {/* Back Navigation */}
      <div className="border-b border-purple-200/20 bg-purple-50/40 backdrop-blur-md transition-colors duration-300 dark:border-white/5 dark:bg-zinc-950/80">
        <div className="container-custom py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article>
        {/* Header */}
        <header className="relative overflow-hidden border-b border-border/60 bg-background py-12 transition-colors duration-300 md:py-16">
          <div className="theme-grid-overlay" aria-hidden="true" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{ background: 'var(--radial-glow)' }}
            aria-hidden="true"
          />
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-3xl">
              {post.category && (
                <Badge
                  variant="secondary"
                  className="mb-4 border-border/60 bg-secondary/50 text-foreground backdrop-blur-md dark:border-white/5 dark:bg-white/10 dark:text-white"
                >
                  {post.category}
                </Badge>
              )}
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5" aria-hidden="true" />
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="h-4.5 w-4.5" aria-hidden="true" />
                    {post.author}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="container-custom py-10 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border">
              <PremiumGradientPlaceholder icon={BookOpen} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-xl prose-img:shadow-lg">
              <MarkdownParser content={post.content} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-8">
                <span className="text-sm text-muted-foreground">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
              <p className="text-muted-foreground">Share this post</p>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="mb-8 text-heading-lg font-bold text-foreground">Related Posts</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row"
                >
                  <div className="relative aspect-video flex-shrink-0 overflow-hidden sm:aspect-square sm:w-48">
                    <PremiumGradientPlaceholder icon={BookOpen} />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {new Date(relatedPost.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <h3 className="line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
