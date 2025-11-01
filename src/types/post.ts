export interface PostFrontmatter {
  title: string;
  date: string;
  path: string;
  excerpt?: string;
  feature_image?: string;
  featured?: boolean;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  slug: string;
}
