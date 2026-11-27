import React from 'react';

/** Splits a sentence into word spans for the scroll scrub ([data-scrub]). `*word*` marks a highlighted word. */
export default function Words({ text, as: Tag = 'p', className = 'statement' }: { text: string; as?: 'p' | 'h2'; className?: string }) {
  const parts = text.split(' ');
  return (
    <Tag className={className} data-scrub>
      {parts.map((w, i) => {
        const hl = w.startsWith('*');
        const clean = w.replace(/\*/g, '');
        return (
          <React.Fragment key={i}>
            <span className={`w${hl ? ' hl' : ''}`}>{clean}</span>{i < parts.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
