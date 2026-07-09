'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Copy, Share2 } from 'lucide-react';
import Link from 'next/link';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || '';
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('https://barua.me');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const shareLink = `${origin}/for/${slug}`;
  const displayLink = `barua.me/for/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const whatsappText = encodeURIComponent(
    `I made something for you. Open this when you have two minutes 💌 ${shareLink}`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 text-foreground w-full">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
        <div className="text-4xl">💌</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Your Barua is ready
          </h1>
          <p className="text-sm text-gray-500">
            Copy the link below and send it to your person.
          </p>
        </div>

        {/* Link box */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-[#D4537E] truncate select-all">
            {displayLink}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-600 outline-none transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full bg-[#D4537E] text-white rounded-lg py-3 font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {copied ? 'Copied!' : 'Copy link'}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg py-3 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={16} />
            Share via WhatsApp
          </a>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
          <a
            href={`/for/${slug}`}
            className="text-xs font-semibold text-[#D4537E] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview your experience &rarr;
          </a>

          <Link
            href="/dashboard"
            className="text-xs font-semibold text-gray-500 hover:text-gray-700 hover:underline"
          >
            Go to Dashboard
          </Link>

          <button
            type="button"
            className="text-xs text-gray-400 hover:underline outline-none"
            onClick={() => alert('Premium upgrades coming soon!')}
          >
            Upgrade to premium
          </button>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-sm font-semibold text-gray-500">Loading your Barua...</p>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
