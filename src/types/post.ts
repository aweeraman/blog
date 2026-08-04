export interface PostFrontmatter {
  title: string;
  date: string;
  path: string;
  excerpt?: string;
  feature_image?: string;
  feature_image_alt?: string;
  feature_image_attribution?: string;
  feature_image_attribution_url?: string;
  feature_image_license?: string;
  feature_image_license_url?: string;
  featured?: boolean;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  slug: string;
}
