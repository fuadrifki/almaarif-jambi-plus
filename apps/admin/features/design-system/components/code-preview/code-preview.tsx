'use client';

import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { useState } from 'react';

interface CodePreviewProps {
  code: string;
}

export function CodePreview({ code }: CodePreviewProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-(--border)">
      <div className="flex items-center justify-between border-b border-(--border) px-4 py-2">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-xs text-(--text-secondary) transition hover:bg-black/5 hover:text-(--text-primary)"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}

          {expanded ? 'Hide Code' : 'View Code'}
        </button>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!expanded}
          className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-xs text-(--text-secondary) transition hover:bg-black/5 hover:text-(--text-primary) disabled:pointer-events-none disabled:opacity-40"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      <div
        className={[
          'grid transition-all duration-300 ease-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          <pre className="overflow-x-auto bg-black/5 p-4 text-sm">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
