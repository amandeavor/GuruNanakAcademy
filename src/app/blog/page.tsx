import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SCHOOL_INFO } from '@/lib/constants';
import { getAllPosts } from '@/lib/mdx';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Read the latest news, updates, and insights from ${SCHOOL_INFO.name}. Stay informed about school events, achievements, and educational topics.`,
  openGraph: {
    title: `Blog | ${SCHOOL_INFO.name}`,
    description: 'Latest news, updates, and insights from our school community.',
    url: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 transition-colors duration-300">
        <div className="theme-grid-overlay" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full blur-[100px]"
          style={{ background: 'var(--radial-glow)' }}
          aria-hidden="true"
        />
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 dark:border-white/10 bg-secondary/50 dark:bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground dark:text-white/60 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 dark:bg-white/40" aria-hidden="true" />
              News &amp; Updates
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Our Blog
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Stay connected with the latest happenings, achievements, and insights
              from our school community.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, idx) => {
                const borderColors = [
                  'hover:border-emerald-500/30',
                  'hover:border-sky-500/30',
                  'hover:border-violet-500/30',
                  'hover:border-amber-500/30',
                  'hover:border-rose-500/30',
                  'hover:border-blue-500/30',
                ];
                const borderHover = borderColors[idx % borderColors.length];
                const accents = [
                  { bg: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10' },
                  { bg: 'bg-sky-500/5 text-sky-400 border border-sky-500/10' },
                  { bg: 'bg-violet-500/5 text-violet-400 border border-violet-500/10' },
                  { bg: 'bg-amber-500/5 text-amber-400 border border-amber-500/10' },
                  { bg: 'bg-rose-500/5 text-rose-400 border border-rose-500/10' },
                  { bg: 'bg-blue-500/5 text-blue-400 border border-blue-500/10' },
                ];
                const a = accents[idx % accents.length];
                return (
                  <article
                    key={post.slug}
                    className={cn(
                      "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                      borderHover
                    )}
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={post.image || '/images/about.png'}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {post.category && (
                          <Badge
                            variant="secondary"
                            className="absolute left-4 top-4 border-0 bg-black/40 text-white backdrop-blur-md"
                          >
                            {post.category}
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col p-6 md:p-8">
                      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          {new Date(post.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        {post.author && (
                          <span className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" aria-hidden="true" />
                            {post.author}
                          </span>
                        )}
                      </div>
                      <Link href={`/blog/${post.slug}`} className="block flex-1">
                        <h2 className="mb-4 text-xl font-bold text-foreground group-hover:text-primary dark:group-hover:text-white transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="mb-6 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 transition-colors group-hover:text-foreground"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
