/**
 * Server-Side SEO & Meta Injector for SSR / HTML Requests
 * Ensures Googlebot, Bingbot, and crawlers receive 100% unique, route-specific Title, Description, Canonical, and Schema.
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

export const STATIC_ROUTE_METADATA: Record<string, RouteMeta> = {
  '/': {
    title: 'ViralClip AI – Free Long Video to Shorts Converter AI',
    description: 'Turn long videos into viral shorts, TikToks & Reels in seconds. Free instant AI clip generator with animated captions. Try it now!',
    canonical: `${BASE_URL}/`,
    ogType: 'website',
    schemaType: 'SoftwareApplication',
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
  },
  '/about': {
    title: 'About Us | ViralClip AI – The Video Repurposing Revolution',
    description: 'Learn how ViralClip AI empowers creators to transform long podcasts and YouTube videos into viral short-form clips in seconds with no subscriptions.',
    canonical: `${BASE_URL}/about`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/about-us': {
    title: 'About Us | ViralClip AI – The Video Repurposing Revolution',
    description: 'Learn how ViralClip AI empowers creators to transform long podcasts and YouTube videos into viral short-form clips in seconds with no subscriptions.',
    canonical: `${BASE_URL}/about`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/contact': {
    title: 'Contact Us | ViralClip AI – Support, Inquiries & Help',
    description: 'Need help with your videos, export issues, or custom enterprise clipping plans? Reach out to our dedicated support team 24/7.',
    canonical: `${BASE_URL}/contact`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | ViralClip AI – Video Privacy & Security',
    description: 'Read our Privacy Policy. ViralClip AI respects your privacy: secure processing, no unauthorized data sharing, and zero file retention.',
    canonical: `${BASE_URL}/privacy-policy`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/features': {
    title: 'ViralClip AI Features – AI Video Clipper, Auto Captions & 9:16 Shorts',
    description: 'Explore ViralClip AI features: AI video splitter, dynamic Alex Hormozi captions, multi-language speech recognition, and instant 9:16 formatting.',
    canonical: `${BASE_URL}/features`,
    ogType: 'website',
    schemaType: 'SoftwareApplication',
  },
  '/terms': {
    title: 'Terms of Service | ViralClip AI – User Agreement & Rules',
    description: 'Review the ViralClip AI Terms of Service, acceptable use guidelines, fair credit usage, and software agreement for video creators.',
    canonical: `${BASE_URL}/terms`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/terms-of-service': {
    title: 'Terms of Service | ViralClip AI – User Agreement & Rules',
    description: 'Review the ViralClip AI Terms of Service, acceptable use guidelines, fair credit usage, and software agreement for video creators.',
    canonical: `${BASE_URL}/terms`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/refund-policy': {
    title: 'Cancellation & Refund Policy | ViralClip AI – Fair Guarantee',
    description: 'Review our transparent refund and cancellation policy. We guarantee fair service and credit adjustments for any failed video processing.',
    canonical: `${BASE_URL}/refund-policy`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/cancellation-refund': {
    title: 'Cancellation & Refund Policy | ViralClip AI – Fair Guarantee',
    description: 'Review our transparent refund and cancellation policy. We guarantee fair service and credit adjustments for any failed video processing.',
    canonical: `${BASE_URL}/refund-policy`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/blog': {
    title: 'Creator Video Repurposing Blog & AI Guides | ViralClip AI',
    description: 'Master viral hooks, Alex Hormozi animated kinetic captions, and video clipping comparisons. Free tutorials to scale YouTube Shorts and Instagram Reels.',
    canonical: `${BASE_URL}/blog`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/guides': {
    title: 'Creator Video Repurposing Blog & AI Guides | ViralClip AI',
    description: 'Master viral hooks, Alex Hormozi animated kinetic captions, and video clipping comparisons. Free tutorials to scale YouTube Shorts and Instagram Reels.',
    canonical: `${BASE_URL}/blog`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  // Dedicated Tool Comparison Pages
  '/opus-clip-alternative': {
    title: 'Opus Clip Alternative: 10x Cheaper & Faster (No Subscriptions) | ViralClip AI',
    description: 'Looking for an Opus Clip alternative? Convert long YouTube videos into viral vertical clips with animated captions starting at just ₹49. No recurring fees.',
    canonical: `${BASE_URL}/opus-clip-alternative`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/submagic-alternative': {
    title: 'Submagic Alternative: Fast Animated Captions & Auto-Clipper | ViralClip AI',
    description: 'Generate Alex Hormozi kinetic captions and viral vertical clips in 30 seconds without paying Submagic $20/month. Export 1080p without watermarks.',
    canonical: `${BASE_URL}/submagic-alternative`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/klap-alternative': {
    title: 'Klap.app Alternative: 1-Click Viral Highlights & Speaker Auto-Reframing | ViralClip AI',
    description: 'Auto-detect high retention hooks and format videos into 9:16 vertical clips with dynamic captions. The ultimate budget-friendly Klap alternative.',
    canonical: `${BASE_URL}/klap-alternative`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/vizard-alternative': {
    title: 'Vizard.ai Alternative: Browser-Based Video Clipper & Auto Captions | ViralClip AI',
    description: 'Fast cloud video clipping, zero watermarks, and kinetic word highlights. The lightweight, low-cost Vizard.ai alternative for creators.',
    canonical: `${BASE_URL}/vizard-alternative`,
    ogType: 'website',
    schemaType: 'WebPage',
  },
  '/capcut-alternative': {
    title: 'CapCut Alternative: Auto Subtitles & Shorts Clipper (No VPN Needed) | ViralClip AI',
    description: 'CapCut banned in your region or requiring heavy desktop installs? Create viral vertical clips with word-highlighted captions directly in your browser.',
    canonical: `${BASE_URL}/capcut-alternative`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'CapCut Alternative Online: Auto Subtitles & Shorts Clipper (No VPN Needed)'
  },
  '/capcut-alternative-online-auto-captions-no-vpn': {
    title: 'CapCut Alternative: Auto Subtitles & Shorts Clipper (No VPN Needed) | ViralClip AI',
    description: 'CapCut banned in your region or requiring heavy desktop installs? Create viral vertical clips with word-highlighted captions directly in your browser.',
    canonical: `${BASE_URL}/capcut-alternative`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'CapCut Alternative Online: Auto Subtitles & Shorts Clipper (No VPN Needed)'
  },
  '/choppity-alternative': {
    title: 'Choppity Alternative: 1-Click Podcast to Shorts Without Queue Waits | ViralClip AI',
    description: 'Looking for a fast Choppity alternative? Transform long podcasts into viral vertical clips with sub-second subtitle sync, auto face cropping, and zero queue delays.',
    canonical: `${BASE_URL}/choppity-alternative-cheaper-fast-viral-clips`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Choppity Alternative: 1-Click Podcast to Shorts Without Queue Waits'
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
  '/veed-io-alternative': {
    title: 'Veed.io Alternative: Auto Subtitles & Shorts Clipper (No Watermark Locks) | ViralClip AI',
    description: 'Veed.io locks 1080p downloads and slaps giant watermarks on free accounts. ViralClip AI gives you clean, professional auto-captions and viral clips at a fraction of the cost.',
    canonical: `${BASE_URL}/veed-io-alternative-free-auto-subtitles-no-watermark`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Veed.io Alternative: Auto Subtitles & Shorts Clipper (No Watermark Locks)'
  },
  '/veed-io-alternative-free-auto-subtitles-no-watermark': {
    title: 'Veed.io Alternative: Auto Subtitles & Shorts Clipper (No Watermark Locks) | ViralClip AI',
    description: 'Veed.io locks 1080p downloads and slaps giant watermarks on free accounts. ViralClip AI gives you clean, professional auto-captions and viral clips at a fraction of the cost.',
    canonical: `${BASE_URL}/veed-io-alternative-free-auto-subtitles-no-watermark`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Veed.io Alternative: Auto Subtitles & Shorts Clipper (No Watermark Locks)'
  },
  '/premiere-pro-shorts-alternative': {
    title: 'Premiere Pro Alternative for Shorts: Skip Complex Timelines for 2-Min Clips | ViralClip AI',
    description: 'Opening Adobe Premiere Pro just to cut 30-second shorts and keyframe auto-captions is a massive waste of time. Automate your short-form edits in the browser.',
    canonical: `${BASE_URL}/premiere-pro-alternative-fast-social-shorts`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Premiere Pro Alternative for Shorts: Skip Complex Timelines for 2-Min Clips'
  },
  '/premiere-pro-alternative-fast-social-shorts': {
    title: 'Premiere Pro Alternative for Shorts: Skip Complex Timelines for 2-Min Clips | ViralClip AI',
    description: 'Opening Adobe Premiere Pro just to cut 30-second shorts and keyframe auto-captions is a massive waste of time. Automate your short-form edits in the browser.',
    canonical: `${BASE_URL}/premiere-pro-alternative-fast-social-shorts`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Premiere Pro Alternative for Shorts: Skip Complex Timelines for 2-Min Clips'
  },
  '/autocap-alternative': {
    title: 'AutoCap Alternative: Web-Based Dynamic Captions with Accurate Timing | ViralClip AI',
    description: 'Tired of phone-only caption apps that crash on large files? Generate word-highlighted social captions directly in your browser with high speech accuracy.',
    canonical: `${BASE_URL}/autocap-alternative-dynamic-captions-online`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'AutoCap Alternative: Web-Based Dynamic Captions with Accurate Timing'
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
  '/simplified-video-alternative': {
    title: 'Simplified AI Video Alternative: Dedicated Short-Form Repurposing Engine | ViralClip AI',
    description: 'Simplified tries to do graphic design, copywriting, and video all at once. ViralClip AI is laser-focused on one outcome: creating viral, high-retention vertical clips.',
    canonical: `${BASE_URL}/simplified-video-clipper-alternative`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Simplified AI Video Alternative: Dedicated Short-Form Repurposing Engine'
  },
  '/simplified-video-clipper-alternative': {
    title: 'Simplified AI Video Alternative: Dedicated Short-Form Repurposing Engine | ViralClip AI',
    description: 'Simplified tries to do graphic design, copywriting, and video all at once. ViralClip AI is laser-focused on one outcome: creating viral, high-retention vertical clips.',
    canonical: `${BASE_URL}/simplified-video-clipper-alternative`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Simplified AI Video Alternative: Dedicated Short-Form Repurposing Engine'
  },
  '/clipchamp-auto-caption-alternative': {
    title: 'Clipchamp Alternative: Smart Hook Detection & Kinetic Social Subtitles | ViralClip AI',
    description: 'Clipchamp provides basic editing, but lacks automated viral moment detection for podcasts and webinars. Turn long videos into engaging vertical clips automatically.',
    canonical: `${BASE_URL}/clipchamp-alternative-viral-short-form-video`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Clipchamp Alternative: Smart Hook Detection & Kinetic Social Subtitles'
  },
  '/clipchamp-alternative-viral-short-form-video': {
    title: 'Clipchamp Alternative: Smart Hook Detection & Kinetic Social Subtitles | ViralClip AI',
    description: 'Clipchamp provides basic editing, but lacks automated viral moment detection for podcasts and webinars. Turn long videos into engaging vertical clips automatically.',
    canonical: `${BASE_URL}/clipchamp-alternative-viral-short-form-video`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Clipchamp Alternative: Smart Hook Detection & Kinetic Social Subtitles'
  },
  '/descript-alternative': {
    title: 'Descript Alternative: Fast Browser-Based Podcast to Shorts Clipper | ViralClip AI',
    description: 'Looking for a lightweight Descript alternative? Skip heavy desktop downloads and sluggish rendering. ViralClip AI cuts long podcasts into viral vertical clips with word-level kinetic captions in your browser.',
    canonical: `${BASE_URL}/descript-alternative-browser-podcast-to-shorts-clipper`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Descript Alternative: Fast Browser-Based Podcast to Shorts Clipper (No Lag)'
  },
  '/descript-alternative-browser-podcast-to-shorts-clipper': {
    title: 'Descript Alternative: Fast Browser-Based Podcast to Shorts Clipper | ViralClip AI',
    description: 'Looking for a lightweight Descript alternative? Skip heavy desktop downloads and sluggish rendering. ViralClip AI cuts long podcasts into viral vertical clips with word-level kinetic captions in your browser.',
    canonical: `${BASE_URL}/descript-alternative-browser-podcast-to-shorts-clipper`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Descript Alternative: Fast Browser-Based Podcast to Shorts Clipper (No Lag)'
  },
  '/invideo-ai-alternative': {
    title: 'InVideo AI Alternative: Authentic Clip Repurposing (No Generic Stock) | ViralClip AI',
    description: 'Tired of InVideo AI generating generic stock b-roll and robotic AI voiceovers? ViralClip AI repurposes your authentic human podcast footage into high-converting vertical shorts.',
    canonical: `${BASE_URL}/invideo-ai-alternative-podcast-to-viral-shorts-clipper`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'InVideo AI Alternative: Authentic Clip Repurposing Without Generic AI B-Roll'
  },
  '/invideo-alternative': {
    title: 'InVideo AI Alternative: Authentic Clip Repurposing (No Generic Stock) | ViralClip AI',
    description: 'Tired of InVideo AI generating generic stock b-roll and robotic AI voiceovers? ViralClip AI repurposes your authentic human podcast footage into high-converting vertical shorts.',
    canonical: `${BASE_URL}/invideo-ai-alternative-podcast-to-viral-shorts-clipper`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'InVideo AI Alternative: Authentic Clip Repurposing Without Generic AI B-Roll'
  },
  '/invideo-ai-alternative-podcast-to-viral-shorts-clipper': {
    title: 'InVideo AI Alternative: Authentic Clip Repurposing (No Generic Stock) | ViralClip AI',
    description: 'Tired of InVideo AI generating generic stock b-roll and robotic AI voiceovers? ViralClip AI repurposes your authentic human podcast footage into high-converting vertical shorts.',
    canonical: `${BASE_URL}/invideo-ai-alternative-podcast-to-viral-shorts-clipper`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'InVideo AI Alternative: Authentic Clip Repurposing Without Generic AI B-Roll'
  },
  '/opus-clip-free-alternative': {
    title: 'Opus Clip Free Alternative: 1-Click AI Shorts (No Monthly Locks) | ViralClip AI',
    description: 'Looking for a free Opus Clip alternative without expiring monthly credits or forced subscriptions? Repurpose long podcasts into viral vertical clips with glowing word highlights.',
    canonical: `${BASE_URL}/opus-clip-free-alternative-no-watermark-review`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Opus Clip Free Alternative: 1-Click AI Shorts Without Monthly Locks or Watermark'
  },
  '/opus-clip-vs-viralclip': {
    title: 'Opus Clip Free Alternative: 1-Click AI Shorts (No Monthly Locks) | ViralClip AI',
    description: 'Looking for a free Opus Clip alternative without expiring monthly credits or forced subscriptions? Repurpose long podcasts into viral vertical clips with glowing word highlights.',
    canonical: `${BASE_URL}/opus-clip-free-alternative-no-watermark-review`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Opus Clip Free Alternative: 1-Click AI Shorts Without Monthly Locks or Watermark'
  },
  '/opus-clip-free-alternative-no-watermark-review': {
    title: 'Opus Clip Free Alternative: 1-Click AI Shorts (No Monthly Locks) | ViralClip AI',
    description: 'Looking for a free Opus Clip alternative without expiring monthly credits or forced subscriptions? Repurpose long podcasts into viral vertical clips with glowing word highlights.',
    canonical: `${BASE_URL}/opus-clip-free-alternative-no-watermark-review`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Opus Clip Free Alternative: 1-Click AI Shorts Without Monthly Locks or Watermark'
  },
  // Guide Articles
  '/how-to-add-alex-hormozi-captions-in-60-seconds': {
    title: 'How to Add Alex Hormozi Captions in 60 Seconds | ViralClip AI',
    description: 'Master the high-retention animated subtitle style used by Alex Hormozi, MrBeast, and top creators to boost watch time past 85%.',
    canonical: `${BASE_URL}/how-to-add-alex-hormozi-captions-in-60-seconds`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'How to Add Alex Hormozi Captions in 60 Seconds'
  },
  '/how-to-convert-long-youtube-videos-into-viral-shorts': {
    title: 'How to Convert Long YouTube Videos into 10 Viral Shorts (Repurposing Guide) | ViralClip AI',
    description: 'Turn a 60-minute podcast or interview into 10 high-performing Shorts, Reels, and TikToks in under 5 minutes without manual video editing.',
    canonical: `${BASE_URL}/how-to-convert-long-youtube-videos-into-viral-shorts`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'How to Convert Long YouTube Videos into 10 Viral Shorts (Complete Repurposing Guide)'
  },
  '/viral-hooks-formula-retain-85-percent-watch-time': {
    title: 'The 3-Second Viral Hook Formula to Retain 85%+ Watch Time | ViralClip AI',
    description: 'How top creators hook viewers before the swipe: 7 plug-and-play hook templates and visual strategies that guarantee high viewer retention.',
    canonical: `${BASE_URL}/viral-hooks-formula-retain-85-percent-watch-time`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'The 3-Second Viral Hook Formula to Retain 85%+ Watch Time'
  },
  '/shorts-seo-secrets-rank-number-1-youtube-explore': {
    title: 'YouTube Shorts SEO Secrets: Rank #1 on Explore & Search (2026) | ViralClip AI',
    description: 'The proven step-by-step SEO strategy to rank YouTube Shorts, trigger the Explore algorithm, and drive organic traffic from day one.',
    canonical: `${BASE_URL}/shorts-seo-secrets-rank-number-1-youtube-explore`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'YouTube Shorts SEO Secrets: Rank #1 on Explore & Search (2026)'
  },
  '/kinetic-subtitles-dynamic-word-highlighting-secret': {
    title: 'Kinetic Subtitles: Why Word-Level Highlighting Dominates Social Feeds | ViralClip AI',
    description: 'The cognitive psychology behind kinetic karaoke subtitles, why standard movie subtitles fail on TikTok, and how to configure them.',
    canonical: `${BASE_URL}/kinetic-subtitles-dynamic-word-highlighting-secret`,
    ogType: 'article',
    schemaType: 'Article',
    articleDate: '2026-10-01',
    headline: 'Kinetic Subtitles: Why Word-Level Highlighting Dominates Social Feeds'
  }
};

/**
 * Resolves metadata for any requested URL path
 */
export function getRouteMetadata(rawPath: string): RouteMeta {
  const pathname = (rawPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';

  // 1. Exact match in static dictionary
  if (STATIC_ROUTE_METADATA[pathname]) {
    return STATIC_ROUTE_METADATA[pathname];
  }

  // 2. Check /blog/:slug or /guides/:slug
  const blogMatch = pathname.match(/^\/(?:blog|guides)\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const candidate = STATIC_ROUTE_METADATA[`/${slug}`];
    if (candidate) {
      return {
        ...candidate,
        canonical: `${BASE_URL}/blog/${slug}`,
      };
    }

    // Dynamic fallback for any blog slug
    const cleanTitle = slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${cleanTitle} | ViralClip AI Guide`,
      description: `Read our comprehensive guide on ${cleanTitle.toLowerCase()} for YouTube Shorts, Instagram Reels, and TikTok virality.`,
      canonical: `${BASE_URL}/blog/${slug}`,
      ogType: 'article',
      schemaType: 'Article',
      headline: cleanTitle
    };
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

  // 1. Replace <title>...</title>
  result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);

  // 2. Replace Primary <meta name="description" ...>
  result = result.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // 3. Replace <link rel="canonical" ...>
  result = result.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${meta.canonical}" />`
  );

  // 4. Replace og:title
  result = result.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );

  // 5. Replace og:description
  result = result.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );

  // 6. Replace og:url
  result = result.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${meta.canonical}" />`
  );

  // 7. Replace og:type
  result = result.replace(
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`
  );

  // 8. Replace twitter:title
  result = result.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  );

  // 9. Replace twitter:description
  result = result.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  );

  // 10. Replace twitter:url
  result = result.replace(
    /<meta\s+name=["']twitter:url["'][^>]*>/i,
    `<meta name="twitter:url" content="${meta.canonical}" />`
  );

  // 11. Update hreflang alternate links to current page canonical URL
  result = result.replace(
    /(<link\s+rel=["']alternate["'][^>]*?href=["'])https:\/\/viralclipai\.pro\/(["'][^>]*?>)/gi,
    `$1${meta.canonical}$2`
  );

  // 12. Schema structured data:
  // If not homepage ('/'), purge all homepage schemas (SoftwareApplication with 4.8 rating + FAQPage)
  // and insert the exact, dedicated schema for this page type before </head>
  const pathname = (rawPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  if (pathname !== '/') {
    // Purge existing homepage schemas
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
        'dateModified': '2026-10-24',
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
