'use client';

import React, { useEffect, useState } from 'react';
import { WHATSAPP_INQUIRY_LINK, WHATSAPP_INTL } from '@/lib/siteConfig';

export default function StickyWhatsApp() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleChatToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isOpen === 'boolean') {
        setIsChatOpen(customEvent.detail.isOpen);
      }
    };

    window.addEventListener('aw-chat-toggle', handleChatToggle);
    return () => {
      window.removeEventListener('aw-chat-toggle', handleChatToggle);
    };
  }, []);

  return (
    <aside
      className={`sticky-whatsapp-root ${isChatOpen ? 'is-chat-open' : ''}`}
      aria-label="Quick WhatsApp Contact"
      aria-hidden={isChatOpen}
    >
      <a
        href={WHATSAPP_INQUIRY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-whatsapp-btn"
        aria-label={`Chat with AW Web Services on WhatsApp at ${WHATSAPP_INTL}`}
        tabIndex={isChatOpen ? -1 : 0}
      >
        {/* Pulsing Ripple Effect */}
        <span className="sticky-whatsapp-pulse" aria-hidden="true"></span>

        {/* WhatsApp Icon */}
        <svg
          className="sticky-whatsapp-icon"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.647.766 5.114 2.088 7.206L3 30.5l7.538-1.556A13.435 13.435 0 0016 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.57c-2.317 0-4.48-.65-6.33-1.78l-.454-.277-4.47.923.94-4.354-.303-.482A11.002 11.002 0 014.93 16c0-6.104 4.966-11.07 11.07-11.07 6.104 0 11.07 4.966 11.07 11.07 0 6.104-4.966 11.07-11.07 11.07zm6.074-8.293c-.333-.167-1.97-.972-2.276-1.083-.306-.111-.528-.167-.75.167-.222.333-.861 1.083-1.056 1.306-.194.222-.389.25-.722.083-.333-.167-1.406-.518-2.678-1.653-.99-.882-1.658-1.972-1.852-2.305-.194-.333-.02-.513.146-.679.15-.15.333-.389.5-.583.167-.194.222-.333.333-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.806-1.028-2.472-.27-.648-.546-.56-.75-.57-.194-.01-.417-.013-.639-.013-.222 0-.583.083-.889.417-.306.333-1.167 1.139-1.167 2.778 0 1.639 1.194 3.222 1.361 3.444.167.222 2.35 3.589 5.694 5.033.795.344 1.417.55 1.9.704.798.254 1.525.218 2.1.133.642-.095 1.97-.806 2.25-1.583.278-.778.278-1.444.194-1.583-.083-.139-.306-.222-.639-.389z" />
        </svg>

        {/* Floating Tooltip Pill */}
        <span className="sticky-whatsapp-tooltip">Chat on WhatsApp</span>
      </a>
    </aside>
  );
}
