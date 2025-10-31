export interface PostFrontmatter {
  title: string;
  date: string;
  path: string;
  excerpt?: string;
  feature_image?: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  slug: string;
}
