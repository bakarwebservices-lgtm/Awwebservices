'use client';

import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// CONFIGURATION
// Replace the fallback URL below with your actual webhook endpoint,
// or configure NEXT_PUBLIC_CHAT_WEBHOOK_URL in your .env.local file.
// ============================================================================
const DEFAULT_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || 'https://api.awweb.online/webhook/chat';

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
}

/**
 * Parses basic markdown links in the format [text](url) and returns React elements
 * with clickable <a> tags opening in a new tab.
 */
function renderFormattedMessage(text: string): React.ReactNode {
  if (!text) return null;

  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = markdownLinkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const label = match[1];
    const rawUrl = match[2].trim();
    const isSafe = /^(https?:\/\/|\/|mailto:|tel:|#)/i.test(rawUrl);
    const safeUrl = isSafe ? rawUrl : '#';

    parts.push(
      <a
        key={`link-${match.index}`}
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="chat-message__link"
      >
        {label}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex === 0) {
    return text;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}


interface ChatWidgetProps {
  webhookUrl?: string;
  initialMessage?: string;
  agentName?: string;
  agentSubtitle?: string;
}

export default function ChatWidget({
  webhookUrl = DEFAULT_WEBHOOK_URL,
  initialMessage = "👋 Hello! Welcome to AW Web Services. How can we help elevate your digital presence today?",
  agentName = "AW Assistant",
  agentSubtitle = "Digital Agency AI • Online",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [hasUnread, setHasUnread] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 1. Generate/reuse random session ID once per page session
  useEffect(() => {
    try {
      let storedSessionId = sessionStorage.getItem('aw_chat_session_id');
      if (!storedSessionId) {
        // Generate random sessionId
        const randomPart = Math.random().toString(36).substring(2, 10);
        const timePart = Date.now().toString(36);
        storedSessionId = `aw_sess_${timePart}_${randomPart}`;
        sessionStorage.setItem('aw_chat_session_id', storedSessionId);
      }
      setSessionId(storedSessionId);
    } catch {
      // Fallback if sessionStorage is restricted
      const fallbackId = `aw_sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      setSessionId(fallbackId);
    }

    // Set initial welcome greeting
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'bot',
        text: initialMessage,
        timestamp: timeStr,
      },
    ]);

    // Auto-hide tooltip badge after 8 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => clearTimeout(tooltipTimer);
  }, [initialMessage]);

  // 2. Auto-scroll to bottom of message list on new messages or loading change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // 3. Focus input when opening chat
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setShowTooltip(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen]);

  // 4. Keyboard shortcuts (Escape closes widget)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // POST { sessionId, message } as requested
      const payload = {
        sessionId: sessionId || `aw_sess_${Date.now()}`,
        message: text,
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      let replyText = '';
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        // Support multiple common response schemas: reply, message, response, text, output, etc.
        if (typeof data === 'string') {
          replyText = data;
        } else if (data && typeof data === 'object') {
          replyText =
            data.reply ||
            data.message ||
            data.response ||
            data.text ||
            data.output ||
            data.result ||
            (Array.isArray(data) && data[0]?.text) ||
            JSON.stringify(data, null, 2);
        }
      } else {
        replyText = await response.text();
      }

      if (!replyText || replyText.trim() === '') {
        replyText = "Thank you for reaching out! We've received your request.";
      }

      const botTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: botTimeStr,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err) {
      console.error('Chat webhook error:', err);
      const botTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const errorMessage: Message = {
        id: `err_${Date.now()}`,
        sender: 'bot',
        text: "I'm having a little trouble connecting to the server right now. Please feel free to email us directly at contact@awweb.online or try again in a moment.",
        timestamp: botTimeStr,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: 'bot',
        text: initialMessage,
        timestamp: timeStr,
      },
    ]);
  };

  // Quick suggestion prompts
  const quickPrompts = [
    '✨ Explore Web Services',
    '💼 Request a Project Quote',
    '⚡ E-Commerce Solutions',
    '📞 Talk to our Team',
  ];

  return (
    <aside className="chat-widget-root" aria-label="Website Chat Support">
      {/* Floating Toggle Button */}
      <div className="chat-toggle-wrapper">
        {showTooltip && !isOpen && (
          <div className="chat-preview-tooltip" onClick={() => setIsOpen(true)}>
            <div className="chat-preview-tooltip__avatar">
              <span className="chat-preview-tooltip__status-dot"></span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="chat-preview-tooltip__text">
              <strong>Need assistance?</strong>
              <span>Chat with our team now</span>
            </div>
            <button
              type="button"
              className="chat-preview-tooltip__close"
              aria-label="Dismiss message preview"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
            >
              &times;
            </button>
          </div>
        )}

        <button
          type="button"
          className={`chat-toggle-btn ${isOpen ? 'is-open' : ''} ${hasUnread ? 'has-unread' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close chat widget' : 'Open chat widget'}
          title={isOpen ? 'Close chat' : 'Open chat support'}
        >
          {hasUnread && !isOpen && <span className="chat-toggle-badge" />}
          <div className="chat-toggle-icon">
            {isOpen ? (
              // Close X Icon
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Chat Bubble Icon
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Floating Chat Modal Window */}
      <div className={`chat-window ${isOpen ? 'is-active' : ''}`} aria-hidden={!isOpen}>
        {/* Header */}
        <header className="chat-header">
          <div className="chat-header__info">
            <div className="chat-header__avatar">
              <div className="chat-header__avatar-icon">AW</div>
              <span className="chat-header__status-dot" title="Online" />
            </div>
            <div className="chat-header__details">
              <h3 className="chat-header__title">{agentName}</h3>
              <p className="chat-header__subtitle">{agentSubtitle}</p>
            </div>
          </div>

          <div className="chat-header__actions">
            <button
              type="button"
              className="chat-header__action-btn"
              onClick={handleResetChat}
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M8 16H3v5"></path>
              </svg>
            </button>
            <button
              type="button"
              className="chat-header__action-btn"
              onClick={() => setIsOpen(false)}
              title="Minimize chat"
              aria-label="Minimize chat window"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* Message Stream */}
        <div className="chat-body" tabIndex={0} role="region" aria-label="Conversation Messages">
          <div className="chat-messages-list">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message chat-message--${msg.sender} ${msg.isError ? 'chat-message--error' : ''}`}
              >
                {msg.sender === 'bot' && (
                  <div className="chat-message__avatar" aria-hidden="true">
                    AW
                  </div>
                )}
                <div className="chat-message__content">
                  <div className="chat-message__bubble">
                    <p className="chat-message__text">{renderFormattedMessage(msg.text)}</p>
                  </div>
                  <span className="chat-message__time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Typing / Loading Indicator */}
            {isLoading && (
              <div className="chat-message chat-message--bot chat-message--loading">
                <div className="chat-message__avatar" aria-hidden="true">
                  AW
                </div>
                <div className="chat-message__content">
                  <div className="chat-message__bubble chat-bubble--loading">
                    <div className="chat-typing-dots">
                      <span className="chat-typing-dot"></span>
                      <span className="chat-typing-dot"></span>
                      <span className="chat-typing-dot"></span>
                    </div>
                  </div>
                  <span className="chat-message__time">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions (shown when few messages) */}
          {messages.length <= 2 && !isLoading && (
            <div className="chat-suggestions">
              <span className="chat-suggestions__label">Quick topics:</span>
              <div className="chat-suggestions__list">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="chat-suggestion-chip"
                    onClick={() => handleSendMessage(prompt.replace(/^[^\w\s]+/, '').trim())}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <footer className="chat-footer">
          <form
            className="chat-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="chat-input"
              aria-label="Type your message"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              title="Send message"
            >
              {isLoading ? (
                <div className="chat-send-spinner" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              )}
            </button>
          </form>
          <div className="chat-branding">
            <span>Powered by <strong>AW Web Services</strong></span>
          </div>
        </footer>
      </div>
    </aside>
  );
}
