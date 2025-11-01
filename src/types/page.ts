export interface PageFrontmatter {
  title: string;
  slug: string;
}

export interface Page {
  frontmatter: PageFrontmatter;
  content: string;
  slug: string;
}
