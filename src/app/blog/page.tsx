import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageIntro } from '@/components/shared/page-intro';
import { SCHOOL_INFO } from '@/lib/constants';
import { getAllPosts } from '@/lib/mdx';
export const metadata: Metadata = {
  title: 'Blog',
  description: `Read the latest news, updates, and insights from ${SCHOOL_INFO.name}. Stay informed about school events, achievements, and educational topics.`,
  openGraph: {
    title: `Blog | ${SCHOOL_INFO.name}`,
    description: 'Latest news, updates, and insights from our school community.',
    url: '/blog',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <div className="academy-page pt-20">
      <PageIntro
        label="Blog"
        title="From the Academy."
        description="Stories, ideas and updates from our school community."
      />
      <section className="section-padding">
        <div className="container-custom journal-list">
          {posts.length ? (
            posts.map((post, i) => (
              <article
                key={post.slug}
                className={i === 0 ? 'journal-story journal-featured' : 'journal-story'}
              >
                {post.image && (
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="journal-image"
                  >
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes={
                        i === 0
                          ? '(max-width: 767px) 100vw, 55vw'
                          : '(max-width: 767px) 100vw, 30vw'
                      }
                      className="object-cover"
                    />
                  </Link>
                )}
                <div className="journal-copy">
                  <p className="eyebrow">{post.category || 'Academy journal'}</p>
                  <h2>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <div className="journal-meta">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </time>
                    {post.author && <span>{post.author}</span>}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="academy-link mt-6 inline-flex">
                    Read the story <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Our next story is on its way.</h2>
              <p>In the meantime, explore events from around the Academy.</p>
              <Link className="academy-link" href="/events">
                Explore school events
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
