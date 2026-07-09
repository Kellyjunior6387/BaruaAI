'use client';

import { useState, useEffect } from 'react';
import { Check, Copy, Share2, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import { deleteExperienceAction } from '@/app/dashboard/actions';

interface ActionsProps {
  slug: string;
  experienceId: string;
  recipientName: string;
}

export default function ExperienceDetailActions({
  slug,
  experienceId,
  recipientName,
}: ActionsProps) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('https://barua.me');
  const [isDeleting, setIsDeleting] = useState(false);

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
      console.error('Failed to copy: ', err);
    }
  };

  const whatsappText = encodeURIComponent(
    `I made something for you. Open this when you have two minutes 💌 ${shareLink}`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Barua for ${recipientName}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteExperienceAction(experienceId);
    } catch (err) {
      console.error('Failed to delete experience:', err);
      alert('Failed to delete. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Share Section Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-800">Share Experience</h3>
          <p className="text-xs text-gray-400">Send this link to {recipientName} to view their Barua.</p>
        </div>
        
        {/* Link Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 overflow-hidden">
          <span className="text-xs font-bold text-[#D4537E] truncate select-all">
            {displayLink}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 outline-none"
            title="Copy to clipboard"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full bg-[#D4537E] text-white rounded-xl py-3 font-semibold text-xs hover:bg-[#c3436d] hover:shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Link'}</span>
          </button>

          <Link
            href={`/dashboard/${experienceId}/edit`}
            className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-3 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Edit size={14} />
            <span>Edit Barua Options</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-emerald-100 text-emerald-600 bg-emerald-50/20 hover:bg-emerald-50/50 rounded-xl py-3 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Share2 size={14} />
            <span>Share via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Danger Zone Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-gray-800">Danger Zone</h4>
          <p className="text-xs text-gray-400 font-medium">Permanently delete this experience and response logs.</p>
        </div>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-full border border-red-100 text-red-500 bg-red-50/15 hover:bg-red-50/40 rounded-xl py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={13} />
          <span>{isDeleting ? 'Deleting experience...' : 'Delete this Barua'}</span>
        </button>
      </div>
    </div>
  );
}
