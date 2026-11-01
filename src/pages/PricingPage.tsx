import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PricingSection } from '../components/PricingSection';
import { CallToActionBanner } from '../components/CallToActionBanner';
import { AuthModal } from '../components/AuthModal';
import { updatePageSeo } from '../utils/seo';

export const PricingPage: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    updatePageSeo({
      title: 'Pricing & Plans – Affordable AI Shorts Generator | ViralClip AI',
      description: 'Transparent pay-as-you-go pricing starting at ₹49 ($4.99). Zero recurring subscription traps, lifetime credit validity, 1080p Full HD exports with no watermarks.',
      canonicalPath: '/pricing'
    });
  }, []);


  return (
    <div className="min-h-[100dvh] bg-black text-zinc-100 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Generator
        </Link>
      </div>
      <PricingSection onOpenAuth={() => setIsAuthOpen(true)} />
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <CallToActionBanner 
          title="Ready to Create Your First Viral Clip?"
          subtitle="Upload any video up to 60 minutes. Get 5 free processing minutes instantly on signup."
          primaryButtonText="Upload Video Now (5 Mins Free)"
          showPricingLink={false}
        />
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};
