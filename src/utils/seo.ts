/**
 * Centralized SEO & Meta Tag Manager
 * Completely eliminates duplicate meta tags across page navigations in SPA
 */

export interface SeoConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  imageUrl?: string;
  siteName?: string;
}

const DEFAULT_SITE_TITLE = "ViralClip AI – Free Long Video to Shorts Converter AI";
const DEFAULT_SITE_DESC = "Turn long videos into viral shorts, TikToks & Reels in seconds. Free instant AI clip generator with animated captions. Try it now!";
const DEFAULT_IMAGE_URL = "https://viralclipai.pro/logo.svg";
const BASE_ORIGIN = "https://viralclipai.pro";

/**
 * Remove all elements matching selector
 */
function removeAll(selector: string) {
  const elements = document.head.querySelectorAll(selector);
  elements.forEach((el) => el.remove());
}

/**
 * Helper to ensure exactly ONE single meta tag exists with the target attribute & value.
 * Purges any duplicate or conflicting meta tags.
 */
function setExactMetaTag(attributeName: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attributeName}="${key}"]`;
  const elements = Array.from(document.head.querySelectorAll(selector));

  if (elements.length > 0) {
    elements[0].setAttribute('content', content);
    // Remove all remaining duplicates
    for (let i = 1; i < elements.length; i++) {
      elements[i].remove();
    }
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute(attributeName, key);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

/**
 * Deduplicate and set canonical URL
 */
function setSingleCanonical(url: string) {
  const links = Array.from(document.head.querySelectorAll('link[rel="canonical"]'));
  if (links.length > 0) {
    links[0].setAttribute('href', url);
    for (let i = 1; i < links.length; i++) {
      links[i].remove();
    }
  } else {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }
}

/**
 * Updates all primary, OpenGraph, and Twitter meta tags with strict deduplication.
 */
export function updatePageSeo(config: SeoConfig) {
  const pageTitle = config.title || DEFAULT_SITE_TITLE;
  const pageDesc = config.description || DEFAULT_SITE_DESC;
  const ogType = config.ogType || 'website';
  const imgUrl = config.imageUrl || DEFAULT_IMAGE_URL;

  // 1. Page Title
  document.title = pageTitle;

  // 2. Remove obsolete meta[name="title"] which causes duplicate title flags in SEO audits
  removeAll('meta[name="title"]');

  // 3. Purge any duplicate non-standard property="twitter:*" tags
  removeAll('meta[property="twitter:card"]');
  removeAll('meta[property="twitter:title"]');
  removeAll('meta[property="twitter:description"]');
  removeAll('meta[property="twitter:url"]');
  removeAll('meta[property="twitter:image"]');

  // 4. Primary Meta Description (guaranteed unique single tag)
  setExactMetaTag('name', 'description', pageDesc);

  // 5. Keywords (if provided)
  if (config.keywords && config.keywords.length > 0) {
    setExactMetaTag('name', 'keywords', config.keywords.join(', '));
  }

  // 6. Canonical URL (guaranteed single tag)
  const canonicalUrl = config.canonicalPath 
    ? `${BASE_ORIGIN}${config.canonicalPath.startsWith('/') ? config.canonicalPath : `/${config.canonicalPath}`}`
    : `${BASE_ORIGIN}${window.location.pathname}`;
  setSingleCanonical(canonicalUrl);

  // 7. Open Graph Tags (standard property="og:*")
  setExactMetaTag('property', 'og:title', pageTitle);
  setExactMetaTag('property', 'og:description', pageDesc);
  setExactMetaTag('property', 'og:type', ogType);
  setExactMetaTag('property', 'og:url', canonicalUrl);
  setExactMetaTag('property', 'og:image', imgUrl);
  setExactMetaTag('property', 'og:site_name', config.siteName || 'ViralClip AI');

  // 8. Twitter Card Tags (standard name="twitter:*")
  setExactMetaTag('name', 'twitter:card', 'summary_large_image');
  setExactMetaTag('name', 'twitter:title', pageTitle);
  setExactMetaTag('name', 'twitter:description', pageDesc);
  setExactMetaTag('name', 'twitter:url', canonicalUrl);
  setExactMetaTag('name', 'twitter:image', imgUrl);
}

/**
 * Resets SEO back to default Homepage metadata
 */
export function resetDefaultSeo() {
  updatePageSeo({
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESC,
    canonicalPath: '/',
    ogType: 'website',
    keywords: [
      'video to shorts converter ai',
      'how to turn long videos into viral shorts',
      'instant ai clip generator',
      'viral clips ai',
      'long video to short video ai free',
      'video clip generator',
      'clips ai',
      'ai viral clip maker',
      'clip ai',
      'create ai clip',
      'free clipping ai',
      'ai clip',
      'clipping ai free',
      'clip generator',
      'ai clip maker',
      'short clip maker',
      'long video in viral clips out',
      'video viral website',
      'long to short video converter ai free',
      'viralclip',
      'viralclip.net',
      'viralclip ai',
      'viralclipai',
      'send clip ai',
      'kya hota he',
      'auto caption generator',
      'animated captions for shorts',
      'alex hormozi subtitles',
      'opus clip alternative',
      'submagic alternative',
      'reels maker',
      'tiktok clipper',
      'podcast to shorts'
    ]
  });
}

