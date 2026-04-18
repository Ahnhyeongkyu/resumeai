"use client";

import { ExternalLink } from "lucide-react";
import type { AffiliateLink } from "@/lib/affiliates";
import { trackAffiliateClick } from "@/lib/affiliates";

interface AffiliateCardsProps {
  source: string;
  affiliates: AffiliateLink[];
  title?: string;
  layout?: "grid" | "stack";
  compact?: boolean;
}

export default function AffiliateCards({
  source,
  affiliates,
  title = "Recommended Tools to Land Your Next Interview",
  layout = "grid",
  compact = false,
}: AffiliateCardsProps) {
  if (affiliates.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <span className="text-[10px] uppercase tracking-wide text-gray-400">Sponsored</span>
      </div>
      <div
        className={
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-3 gap-3"
            : "space-y-2"
        }
      >
        {affiliates.map((aff) => (
          <a
            key={aff.id}
            href={aff.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => trackAffiliateClick(source, aff.tracking)}
            className={`block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:bg-gray-50 transition-colors group ${
              compact ? "py-3" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-600">
                {aff.name}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500 shrink-0 mt-0.5" />
            </div>
            {!compact && (
              <p className="text-xs text-gray-500 leading-relaxed mb-2">{aff.description}</p>
            )}
            {aff.badge && (
              <span className="inline-block text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {aff.badge}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
