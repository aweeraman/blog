import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import matter from 'gray-matter';
import { MarkdownRenderer } from '../src/components/MarkdownRenderer';

const SITE_URL = 'https://weeraman.com';
const FEED_URL = `${SITE_URL}/rss.xml`;
const FEED_TITLE = 'Anuradha Weeraman';
const FEED_DESCRIPTION = 'Writing on technology, open source, distributed systems, artificial intelligence, security, and software engineering.';
const AUTHOR = 'Anuradha Weeraman';
const MAX_ITEMS = 30;

interface FeedPost {
  title: string;
  date: Date;
  path: string;
  excerpt: string;
  featureImage?: string;
  content: string;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function wrapCdata(value: string): string {
  return `<![CDATA[${value.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

function absoluteUrl(value: string): string {
  return new URL(value, `${SITE_URL}/`).href;
}

function makeHtmlUrlsAbsolute(html: string): string {
  const withAbsoluteUrls = html.replace(
    /\b(href|src)=(["'])(\/(?!\/)[^"']*)\2/g,
    (_match, attribute: string, quote: string, url: string) =>
      `${attribute}=${quote}${absoluteUrl(url)}${quote}`,
  );

  return withAbsoluteUrls.replace(
    /\bsrcSet=(["'])([^"']*)\1/g,
    (_match, quote: string, srcset: string) => {
      const absoluteSrcset = srcset
        .split(',')
        .map((candidate) => {
          const trimmed = candidate.trim();
          const separatorIndex = trimmed.search(/\s/);
          const url = separatorIndex === -1 ? trimmed : trimmed.slice(0, separatorIndex);
          const descriptor = separatorIndex === -1 ? '' : trimmed.slice(separatorIndex);
          return `${url.startsWith('/') ? absoluteUrl(url) : url}${descriptor}`;
        })
        .join(', ');

      return `srcset=${quote}${absoluteSrcset}${quote}`;
    },
  );
}

function renderPostContent(post: FeedPost): string {
  const articleHtml = renderToStaticMarkup(
    React.createElement(MarkdownRenderer, { content: post.content }),
  );
  const featureImageHtml = post.featureImage
    ? `<p><img src="${escapeXml(absoluteUrl(post.featureImage))}" alt="${escapeXml(post.title)}" /></p>`
    : '';

  return makeHtmlUrlsAbsolute(`${featureImageHtml}${articleHtml}`);
}

function loadPosts(): FeedPost[] {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory).filter((filename) => filename.endsWith('.md'));

  return filenames
    .map((filename) => {
      const source = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
      const { data, content } = matter(source);
      const missingFields = ['title', 'date', 'path', 'excerpt'].filter((field) => !data[field]);

      if (missingFields.length > 0) {
        throw new Error(`${filename} is missing RSS frontmatter: ${missingFields.join(', ')}`);
      }

      const publishedAt = new Date(data.date);
      if (Number.isNaN(publishedAt.getTime())) {
        throw new Error(`${filename} has an invalid publication date: ${data.date}`);
      }

      return {
        title: String(data.title),
        date: publishedAt,
        path: String(data.path),
        excerpt: String(data.excerpt),
        featureImage: data.feature_image ? String(data.feature_image) : undefined,
        content,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function generateRss(posts: FeedPost[]): string {
  if (posts.length === 0) {
    throw new Error('Cannot generate RSS without any posts.');
  }

  const items = posts.slice(0, MAX_ITEMS).map((post) => {
    const permalink = absoluteUrl(post.path);
    const featureImage = post.featureImage ? absoluteUrl(post.featureImage) : undefined;

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(permalink)}</link>
      <guid isPermaLink="true">${escapeXml(permalink)}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <dc:creator>${escapeXml(AUTHOR)}</dc:creator>
      <description>${wrapCdata(post.excerpt)}</description>
      ${featureImage ? `<media:content url="${escapeXml(featureImage)}" medium="image" />` : ''}
      <content:encoded>${wrapCdata(renderPostContent(post))}</content:encoded>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${posts[0].date.toUTCString()}</lastBuildDate>
    <generator>weeraman.com RSS generator</generator>
    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;
}

const posts = loadPosts();
const outputPath = path.join(process.cwd(), 'public', 'rss.xml');

fs.writeFileSync(outputPath, generateRss(posts));
console.log(`✓ RSS feed generated at ${outputPath}`);
console.log(`  Items: ${Math.min(posts.length, MAX_ITEMS)}`);
