/**
 * Server-Side SEO & Meta Injector for SSR / HTML Requests
 * Ensures Googlebot, Bingbot, and crawlers receive 100% unique, route-specific Title, Description, Canonical, and Schema
 * across all 27 canonical pages with zero duplicate meta tags.
 */

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  schemaType?: 'SoftwareApplication' | 'Article' | 'WebPage' | 'FAQPage';
  articleDate?: string;
  headline?: string;
}

const BASE_URL = 'https://viralclipai.pro';

/**
 * Maps all 18 legacy/duplicate URLs to their single canonical route
 */
export const CANONICAL_ALIAS_MAP: Record<string, string> = {
  '/features': '/',
  '/about-us': '/about',
  '/terms-of-service': '/terms',
  '/cancellation-refund': '/refund-policy',
  '/guides': '/blog',
  '/opus-clip-free-alternative-no-watermark-review': '/opus-clip-alternative',
  '/opus-clip-free-alternative': '/opus-clip-alternative',
  '/opus-clip-vs-viralclip': '/opus-clip-alternative',
  '/opus-clip-alternative-convert-long-videos-to-shorts': '/how-to-convert-long-youtube-videos-into-viral-shorts',
  '/capcut-alternative-online-auto-captions-no-vpn': '/capcut-alternative',
  '/choppity-alternative': '/choppity-alternative-cheaper-fast-viral-clips',
  '/veed-io-alternative': '/veed-io-alternative-free-auto-subtitles-no-watermark',
  '/premiere-pro-shorts-alternative': '/premiere-pro-alternative-fast-social-shorts',
  '/autocap-alternative': '/autocap-alternative-dynamic-captions-online',
  '/simplified-video-alternative': '/simplified-video-clipper-alternative',
  '/clipchamp-auto-caption-alternative': '/clipchamp-alternative-viral-short-form-video',
  '/descript-alternative': '/descript-alternative-browser-podcast-to-shorts-clipper',
  '/invideo-alternative': '/invideo-ai-alternative-podcast-to-viral-shorts-clipper',
  '/invideo-ai-alternative': '/invideo-ai-alternative-podcast-to-viral-shorts-clipper',
};

export const STATIC_ROUTE_METADATA: Record<string, RouteMeta> = {
  // ============================================================================
  // 1. CORE PLATFORM & POLICY PAGES (9 Pages)
  // ============================================================================
  '/': {
    title: 'ViralClip AI – Free Long Video to Shorts Converter AI',
    description: 'Turn long videos into viral shorts, TikToks & Reels in seconds. Free instant AI clip generator with animated captions. Try it now!',
    canonical: `${BASE_URL}/`,
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    headline: 'Free Long Video to Viral Shorts Converter AI',
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
  },
  '/pricing': {
    title: 'Pricing & Plans – Affordable AI Shorts Generator | ViralClip AI',
    description: 'Transparent pay-as-you-go pricing starting at ₹49 ($4.99). Zero recurring subscription traps, lifetime credit validity, 1080p Full HD exports with no watermarks.',
    canonical: `${BASE_URL}/pricing`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'Transparent Pay-As-You-Go Pricing Plans'
  },
  '/blog': {
    title: 'Creator Video Repurposing Blog & AI Shorts Tutorials | ViralClip AI',
    description: 'Master viral hooks, Alex Hormozi animated kinetic captions, and AI video clipping comparisons. Free articles to scale YouTube Shorts and Instagram Reels.',
    canonical: `${BASE_URL}/blog`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'How to Go Viral with AI Animated Captions'
  },
  '/about': {
    title: 'About ViralClip AI – Our Mission & Video Repurposing Platform',
    description: 'Learn how ViralClip AI empowers creators worldwide to transform long podcasts and YouTube videos into viral short-form clips in seconds with zero subscriptions.',
    canonical: `${BASE_URL}/about`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'Empowering Creators with Next-Gen Video AI',
    keywords: [
      'about viralclip ai',
      'video repurposing company',
      'ai video clipping platform',
      'viral shorts maker'
    ]
  },
  '/contact': {
    title: 'Contact Us | ViralClip AI – 24/7 Creator Support & Inquiries',
    description: 'Need help with video exports, billing credits, or custom agency plans? Reach out to our dedicated ViralClip AI creator support team 24/7.',
    canonical: `${BASE_URL}/contact`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'Contact ViralClip AI Creator Support'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | ViralClip AI – Video Data Protection & Security',
    description: 'Read the official ViralClip AI Privacy Policy. We guarantee secure video processing, strict GDPR protection, and zero unauthorized data sharing.',
    canonical: `${BASE_URL}/privacy-policy`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'Privacy Policy & Data Protection Standards'
  },
  '/terms': {
    title: 'Terms of Service | ViralClip AI – User Agreement & Platform Rules',
    description: 'Review the ViralClip AI Terms of Service covering acceptable platform usage, creator copyright ownership, credit validity, and service commitments.',
    canonical: `${BASE_URL}/terms`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'Terms of Service & Platform User Agreement'
  },
  '/refund-policy': {
    title: 'Refund Policy | ViralClip AI – Fair Credit & Payment Guarantee',
    description: 'Read our transparent refund policy. ViralClip AI guarantees credit restoration or full payment refunds for any verified technical rendering failure.',
    canonical: `${BASE_URL}/refund-policy`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'Refund Policy & Fair Processing Guarantee'
  },

  // ============================================================================
  // 2. VIRAL GROWTH & CAPTION STRATEGY GUIDES (5 Pages)
  // ============================================================================
  '/how-to-convert-long-youtube-videos-into-viral-shorts': {
    title: 'How to Convert Long YouTube Videos into 10 Viral Shorts | ViralClip AI',
    description: 'Turn a 60-minute podcast or YouTube interview into 10 high-performing Shorts, Reels, and TikToks in under 5 minutes without manual timeline editing.',
    canonical: `${BASE_URL}/how-to-convert-long-youtube-videos-into-viral-shorts`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'How to Convert Long YouTube Videos into 10 Viral Shorts (Complete Repurposing Guide)'
  },
  '/how-to-add-alex-hormozi-captions-in-60-seconds': {
    title: 'How to Add Alex Hormozi Captions in 60 Seconds | ViralClip AI',
    description: 'Master the high-retention animated subtitle style used by Alex Hormozi, MrBeast, and top creators to boost short-form watch time past 85%.',
    canonical: `${BASE_URL}/how-to-add-alex-hormozi-captions-in-60-seconds`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'How to Add Alex Hormozi Captions in 60 Seconds'
  },
  '/viral-hooks-formula-retain-85-percent-watch-time': {
    title: 'The 3-Second Viral Hook Formula to Retain 85%+ Watch Time | ViralClip AI',
    description: 'Learn how top creators hook viewers before the swipe: 7 plug-and-play negative and visual hook templates that guarantee 85%+ viewer retention.',
    canonical: `${BASE_URL}/viral-hooks-formula-retain-85-percent-watch-time`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Viral Hooks Formula: Retain 85%+ Watch Time on Shorts & Reels'
  },
  '/shorts-seo-secrets-rank-number-1-youtube-explore': {
    title: 'YouTube Shorts SEO Secrets: Rank #1 on Explore & Search (2026) | ViralClip AI',
    description: 'The proven step-by-step spoken keyword and metadata SEO strategy to rank YouTube Shorts #1 on Search and trigger the Explore feed algorithm.',
    canonical: `${BASE_URL}/shorts-seo-secrets-rank-number-1-youtube-explore`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Shorts SEO Secrets: Rank #1 on YouTube Search & Explore'
  },
  '/kinetic-subtitles-dynamic-word-highlighting-secret': {
    title: 'Kinetic Subtitles: Why Word-Level Highlighting Dominates Feeds | ViralClip AI',
    description: 'Discover the cognitive psychology behind kinetic word-by-word karaoke subtitles, why static captions fail on mute, and how to automate word glow.',
    canonical: `${BASE_URL}/kinetic-subtitles-dynamic-word-highlighting-secret`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Dynamic Subtitles: The Secret Behind 10M+ View Shorts & Reels'
  },

  // ============================================================================
  // 3. COMPETITOR ALTERNATIVES & COMPARISONS (13 Pages — 1 Per Tool)
  // ============================================================================
  '/opus-clip-alternative': {
    title: 'Best Opus Clip Alternative (2026) – Pay-As-You-Go From ₹49 | ViralClip AI',
    description: 'Looking for the best Opus Clip alternative? Avoid $15–$29/mo recurring subscriptions and expiring credits. Get lifetime credits, 1080p HD & zero watermark.',
    canonical: `${BASE_URL}/opus-clip-alternative`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'The Best Opus Clip Alternative Without Monthly Subscription Traps'
  },
  '/submagic-alternative': {
    title: 'Best Submagic Alternative – Free Hormozi Captions & 1080p Export | ViralClip AI',
    description: 'Why pay Submagic $20/month just for captions? ViralClip AI combines 1-click AI video clipping with Alex Hormozi kinetic subtitles & clean 1080p export from ₹49.',
    canonical: `${BASE_URL}/submagic-alternative`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'The All-in-One Submagic Alternative With Free Hormozi Captions'
  },
  '/klap-alternative': {
    title: 'Cheapest Klap.app Alternative for YouTube Shorts & Reels | ViralClip AI',
    description: 'Frustrated by Klap.app’s $29/mo starter fee and heavy free watermarks? ViralClip AI offers 10+ AI shorts, 9:16 reframing, and clean 1080p downloads from ₹49.',
    canonical: `${BASE_URL}/klap-alternative`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'The Most Affordable Klap.app Alternative For Shorts & Reels Creators'
  },
  '/vizard-alternative': {
    title: 'Faster, Simpler Vizard AI Alternative – 1-Click Viral Clipping | ViralClip AI',
    description: 'Skip Vizard AI’s complex timeline editor and slow rendering queues. ViralClip AI auto-detects high-retention podcast highlights in 1 click from ₹49 ($4.99).',
    canonical: `${BASE_URL}/vizard-alternative`,
    ogType: 'website',
    schemaType: 'WebPage',
    headline: 'The Faster & Simpler Vizard AI Alternative With Instant Render'
  },
  '/capcut-alternative': {
    title: 'CapCut Alternative: Browser AI Video Clipper & Auto Captions | ViralClip AI',
    description: 'Looking for a fast CapCut alternative? Edit viral 9:16 shorts directly in your browser with automatic word-highlighted captions and 1080p export without watermarks.',
    canonical: `${BASE_URL}/capcut-alternative`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'CapCut Alternative: Browser AI Video Clipper & Auto Captions'
  },
  '/choppity-alternative-cheaper-fast-viral-clips': {
    title: 'Choppity Alternative: 1-Click Podcast to Shorts Without Queue Waits | ViralClip AI',
    description: 'Looking for a fast Choppity alternative? Transform long podcasts into viral vertical clips with sub-second subtitle sync, auto face cropping, and zero queue delays.',
    canonical: `${BASE_URL}/choppity-alternative-cheaper-fast-viral-clips`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Choppity Alternative: 1-Click Podcast to Shorts Without Queue Waits'
  },
  '/veed-io-alternative-free-auto-subtitles-no-watermark': {
    title: 'Veed.io Alternative: Free Auto Subtitles & 1080p Export (No Watermark) | ViralClip AI',
    description: 'Veed.io locks 1080p downloads and slaps giant watermarks on free accounts. ViralClip AI gives you clean, professional auto-captions and viral clips at a fraction of the cost.',
    canonical: `${BASE_URL}/veed-io-alternative-free-auto-subtitles-no-watermark`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Veed.io Alternative: Auto Subtitles & Shorts Clipper (No Watermark Locks)'
  },
  '/premiere-pro-alternative-fast-social-shorts': {
    title: 'Premiere Pro Alternative for Shorts: Skip Timelines for 2-Min Clips | ViralClip AI',
    description: 'Opening Adobe Premiere Pro just to cut 30-second shorts and keyframe auto-captions is a massive waste of time. Automate your short-form edits in the browser.',
    canonical: `${BASE_URL}/premiere-pro-alternative-fast-social-shorts`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Premiere Pro Alternative for Shorts: Skip Complex Timelines for 2-Min Clips'
  },
  '/autocap-alternative-dynamic-captions-online': {
    title: 'AutoCap Alternative: Web-Based Dynamic Captions with Accurate Timing | ViralClip AI',
    description: 'Tired of phone-only caption apps that crash on large files? Generate word-highlighted social captions directly in your browser with high speech accuracy.',
    canonical: `${BASE_URL}/autocap-alternative-dynamic-captions-online`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'AutoCap Alternative: Web-Based Dynamic Captions with Accurate Timing'
  },
  '/simplified-video-clipper-alternative': {
    title: 'Simplified AI Video Alternative: Dedicated Short-Form Clipper Engine | ViralClip AI',
    description: 'Simplified tries to do graphic design, copywriting, and video all at once. ViralClip AI is laser-focused on one outcome: creating viral, high-retention vertical clips.',
    canonical: `${BASE_URL}/simplified-video-clipper-alternative`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Simplified AI Video Alternative: Dedicated Short-Form Repurposing Engine'
  },
  '/clipchamp-alternative-viral-short-form-video': {
    title: 'Clipchamp Alternative: Smart Hook Detection & Kinetic Subtitles | ViralClip AI',
    description: 'Clipchamp provides basic editing, but lacks automated viral moment detection for podcasts and webinars. Turn long videos into engaging vertical clips automatically.',
    canonical: `${BASE_URL}/clipchamp-alternative-viral-short-form-video`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Clipchamp Alternative: Smart Hook Detection & Kinetic Social Subtitles'
  },
  '/descript-alternative-browser-podcast-to-shorts-clipper': {
    title: 'Descript Alternative: Fast Browser Podcast to Shorts Clipper | ViralClip AI',
    description: 'Looking for a lightweight Descript alternative? Skip heavy desktop downloads and sluggish rendering. Cut long podcasts into viral vertical clips in your browser.',
    canonical: `${BASE_URL}/descript-alternative-browser-podcast-to-shorts-clipper`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Descript Alternative: Fast Browser-Based Podcast to Shorts Clipper (No Lag)'
  },
  '/invideo-ai-alternative-podcast-to-viral-shorts-clipper': {
    title: 'InVideo AI Alternative: Authentic Podcast Repurposing (No Stock) | ViralClip AI',
    description: 'Tired of InVideo AI generating generic stock b-roll and robotic AI voiceovers? ViralClip AI repurposes your authentic human podcast footage into vertical shorts.',
    canonical: `${BASE_URL}/invideo-ai-alternative-podcast-to-viral-shorts-clipper`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'InVideo AI Alternative: Authentic Clip Repurposing Without Generic AI B-Roll'
  }
};

/**
 * Resolves metadata for any requested URL path
 */
export function getRouteMetadata(rawPath: string): RouteMeta {
  const cleanPath = (rawPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase() || '/';
  const pathname = CANONICAL_ALIAS_MAP[cleanPath] || cleanPath;

  // 1. Exact match in static dictionary (27 canonical pages)
  if (STATIC_ROUTE_METADATA[pathname]) {
    return STATIC_ROUTE_METADATA[pathname];
  }

  // 2. Check /blog/:slug or /guides/:slug
  const blogMatch = pathname.match(/^\/(?:blog|guides)\/([^/]+)$/);
  if (blogMatch) {
    const rawSlug = `/${blogMatch[1]}`;
    const canonicalSlugPath = CANONICAL_ALIAS_MAP[rawSlug] || rawSlug;
    if (STATIC_ROUTE_METADATA[canonicalSlugPath]) {
      return STATIC_ROUTE_METADATA[canonicalSlugPath];
    }
  }

  // 3. Fallback to homepage metadata
  return STATIC_ROUTE_METADATA['/'];
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Injects route-specific Title, Description, Canonical, OG, Twitter, and Schema into the HTML document.
 */
export function injectRouteSeo(html: string, rawPath: string): string {
  const meta = getRouteMetadata(rawPath);
  let result = html;

  // 1. Purge obsolete or conflicting <meta name="title" ...>
  result = result.replace(/<meta\s+name=["']title["'][^>]*>\s*/gi, '');

  // 2. Replace <title>...</title>
  result = result.replace(/<title>[\s\S]*?<\/title>/gi, `<title>${escapeHtml(meta.title)}</title>`);

  // 3. Deduplicate and replace Primary <meta name="description" ...>
  result = result.replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '');
  result = result.replace(
    /<\/title>/i,
    `</title>\n    <meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // 4. Deduplicate and replace <link rel="canonical" ...>
  result = result.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '');
  result = result.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `$& \n    <link rel="canonical" href="${meta.canonical}" />`
  );

  // 5. Update keywords if provided for this route
  if (meta.keywords && meta.keywords.length > 0) {
    result = result.replace(
      /<meta\s+name=["']keywords["'][^>]*>/gi,
      `<meta name="keywords" content="${escapeHtml(meta.keywords.join(', '))}" />`
    );
  }

  // 6. Replace Open Graph Tags
  result = result.replace(
    /<meta\s+property=["']og:title["'][^>]*>/gi,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );
  result = result.replace(
    /<meta\s+property=["']og:description["'][^>]*>/gi,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );
  result = result.replace(
    /<meta\s+property=["']og:url["'][^>]*>/gi,
    `<meta property="og:url" content="${meta.canonical}" />`
  );
  result = result.replace(
    /<meta\s+property=["']og:type["'][^>]*>/gi,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`
  );
  result = result.replace(
    /<meta\s+property=["']og:image:alt["'][^>]*>/gi,
    `<meta property="og:image:alt" content="${escapeHtml(meta.title)}" />`
  );

  // 7. Replace Twitter Card Tags
  result = result.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/gi,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  );
  result = result.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/gi,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  );
  result = result.replace(
    /<meta\s+name=["']twitter:url["'][^>]*>/gi,
    `<meta name="twitter:url" content="${meta.canonical}" />`
  );
  result = result.replace(
    /<meta\s+name=["']twitter:image:alt["'][^>]*>/gi,
    `<meta name="twitter:image:alt" content="${escapeHtml(meta.title)}" />`
  );

  // 8. Update hreflang alternate links to current page canonical URL
  result = result.replace(
    /(<link\s+rel=["']alternate["'][^>]*?href=["'])https:\/\/viralclipai\.pro\/(["'][^>]*?>)/gi,
    `$1${meta.canonical}$2`
  );

  // 9. Schema structured data:
  // If not homepage ('/'), purge homepage schemas and insert dedicated schema for this page
  const pathname = (rawPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  if (pathname !== '/') {
    result = result.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');

    let pageSchema: object;
    if (meta.schemaType === 'Article') {
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': meta.headline || meta.title,
        'description': meta.description,
        'url': meta.canonical,
        'datePublished': meta.articleDate || '2026-10-01',
        'dateModified': '2026-11-10',
        'author': {
          '@type': 'Organization',
          'name': 'ViralClip AI'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'ViralClip AI',
          'logo': {
            '@type': 'ImageObject',
            'url': `${BASE_URL}/logo.svg`
          }
        }
      };
    } else {
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': meta.title,
        'description': meta.description,
        'url': meta.canonical
      };
    }

    const scriptTag = `\n    <script type="application/ld+json">\n${JSON.stringify(pageSchema, null, 2)}\n    </script>\n  `;
    result = result.replace('</head>', `${scriptTag}</head>`);
  }

  return result;
}
