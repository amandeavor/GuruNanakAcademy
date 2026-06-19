import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOG_DIR);
    return files
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => file.replace(/\.mdx?$/, ''));
  } catch {
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlugSync(slug: string): BlogPost | null {
  try {
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
    const mdPath = path.join(BLOG_DIR, `${slug}.md`);
    
    let filePath = '';
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      image: data.image,
      featured: data.featured || false,
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Get a single blog post by slug (async version)
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return getPostBySlugSync(slug);
}

/**
 * Get all blog posts metadata (without content)
 */
export function getAllPostsMeta(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlugSync(slug);
      if (!post) return null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get all blog posts (alias for getAllPostsMeta)
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  return getAllPostsMeta();
}

/**
 * Get featured blog posts
 */
export function getFeaturedPosts(limit = 3): BlogPostMeta[] {
  const posts = getAllPostsMeta();
  return posts.filter((post) => post.featured).slice(0, limit);
}

/**
 * Get recent blog posts
 */
export function getRecentPosts(limit = 5): BlogPostMeta[] {
  const posts = getAllPostsMeta();
  return posts.slice(0, limit);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPostMeta[] {
  const posts = getAllPostsMeta();
  return posts.filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getAllPostsMeta();
  return posts.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getAllPostsMeta();
  const categories = new Set<string>();
  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPostsMeta();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Paginate posts
 */
export function paginatePosts(
  page: number = 1,
  perPage: number = 10
): { posts: BlogPostMeta[]; totalPages: number; currentPage: number } {
  const allPosts = getAllPostsMeta();
  const totalPages = Math.ceil(allPosts.length / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * perPage;
  const posts = allPosts.slice(start, start + perPage);

  return {
    posts,
    totalPages,
    currentPage,
  };
}
