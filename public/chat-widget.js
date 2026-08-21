/**
 * AW Web Services — Standalone Floating Chat Widget Embed Script
 * Can be embedded into any HTML page by adding:
 * <script src="/chat-widget.js" data-webhook="YOUR_WEBHOOK_URL"></script>
 */
(function () {
  if (typeof window === 'undefined') return;

  // 1. Session ID (persisted per page load / session)
  let sessionId = sessionStorage.getItem('aw_chat_session_id');
  if (!sessionId) {
    sessionId = 'aw_sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('aw_chat_session_id', sessionId);
  }

  // 2. Configuration
  const currentScript = document.currentScript;
  const WEBHOOK_URL =
    (currentScript && currentScript.getAttribute('data-webhook')) ||
    'https://api.awweb.online/webhook/chat';

  // 3. Inject Styles
  const style = document.createElement('style');
  style.innerHTML = `
    .aw-chat-root { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .aw-chat-toggle { position: fixed; bottom: 28px; right: 28px; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #3163cf 0%, #5a87e8 100%); color: #fff; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 10px 30px rgba(49,99,207,0.38); cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 999999; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
    .aw-chat-toggle:hover { transform: scale(1.08); }
    .aw-chat-window { position: fixed; bottom: 100px; right: 28px; width: min(390px, calc(100vw - 36px)); height: min(580px, calc(100vh - 130px)); background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 24px; box-shadow: 0 24px 60px rgba(0,0,0,0.2); display: flex; flex-direction: column; z-index: 999999; overflow: hidden; opacity: 0; transform: translateY(20px) scale(0.95); pointer-events: none; transition: all 0.3s ease; }
    .aw-chat-window.is-open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
    .aw-chat-header { background: #f8faff; padding: 16px 18px; border-bottom: 1px solid rgba(0,0,0,0.06); display: flex; justify-content: space-between; align-items: center; }
    .aw-chat-title { font-weight: 700; font-size: 0.95rem; color: #04070d; }
    .aw-chat-subtitle { font-size: 0.725rem; color: #5b6c8f; }
    .aw-chat-close { background: none; border: none; font-size: 1.3rem; color: #5b6c8f; cursor: pointer; }
    .aw-chat-body { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .aw-chat-msg { display: flex; flex-direction: column; max-width: 85%; }
    .aw-chat-msg.bot { align-self: flex-start; }
    .aw-chat-msg.user { align-self: flex-end; align-items: flex-end; }
    .aw-chat-bubble { padding: 10px 14px; font-size: 0.875rem; border-radius: 18px; line-height: 1.45; word-break: break-word; }
    .aw-chat-msg.bot .aw-chat-bubble { background: #f0f4fd; color: #04070d; border-bottom-left-radius: 4px; }
    .aw-chat-msg.user .aw-chat-bubble { background: linear-gradient(135deg, #3163cf 0%, #5a87e8 100%); color: #fff; border-bottom-right-radius: 4px; }
    .aw-chat-footer { padding: 12px 16px; background: #f8faff; border-top: 1px solid rgba(0,0,0,0.06); }
    .aw-chat-form { display: flex; gap: 8px; background: #fff; border: 1px solid rgba(0,0,0,0.12); border-radius: 12px; padding: 4px 8px; }
    .aw-chat-input { flex: 1; border: none; outline: none; padding: 6px; font-size: 0.875rem; }
    .aw-chat-send { background: #3163cf; color: #fff; border: none; border-radius: 8px; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  `;
  document.head.appendChild(style);

  // 4. Inject DOM Elements
  const container = document.createElement('div');
  container.className = 'aw-chat-root';
  container.innerHTML = `
    <button class="aw-chat-toggle" aria-label="Toggle chat">💬</button>
    <div class="aw-chat-window">
      <div class="aw-chat-header">
        <div>
          <div class="aw-chat-title">AW Support</div>
          <div class="aw-chat-subtitle">Online • Quick replies</div>
        </div>
        <button class="aw-chat-close">&times;</button>
      </div>
      <div class="aw-chat-body" id="awChatMessages">
        <div class="aw-chat-msg bot">
          <div class="aw-chat-bubble">👋 Hello! How can we help you with your project today?</div>
        </div>
      </div>
      <div class="aw-chat-footer">
        <form class="aw-chat-form" id="awChatForm">
          <input type="text" class="aw-chat-input" id="awChatInput" placeholder="Type a message..." required />
          <button type="submit" class="aw-chat-send">➤</button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const toggleBtn = container.querySelector('.aw-chat-toggle');
  const chatWindow = container.querySelector('.aw-chat-window');
  const closeBtn = container.querySelector('.aw-chat-close');
  const chatForm = container.querySelector('#awChatForm');
  const chatInput = container.querySelector('#awChatInput');
  const messagesBox = container.querySelector('#awChatMessages');

  let isOpen = false;
  const toggleChat = () => {
    isOpen = !isOpen;
    chatWindow.classList.toggle('is-open', isOpen);
    if (isOpen) chatInput.focus();
  };

  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', () => {
    isOpen = false;
    chatWindow.classList.remove('is-open');
  });

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    messagesBox.innerHTML += `<div class="aw-chat-msg user"><div class="aw-chat-bubble">${escapeHtml(text)}</div></div>`;
    chatInput.value = '';
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Add typing indicator
    const loadingId = 'loading_' + Date.now();
    messagesBox.innerHTML += `<div class="aw-chat-msg bot" id="${loadingId}"><div class="aw-chat-bubble">...</div></div>`;
    messagesBox.scrollTop = messagesBox.scrollHeight;

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      });
      const data = await res.json();
      const reply = data.reply || data.message || data.text || JSON.stringify(data);
      const loadingEl = document.getElementById(loadingId);
      if (loadingEl) loadingEl.remove();
      messagesBox.innerHTML += `<div class="aw-chat-msg bot"><div class="aw-chat-bubble">${escapeHtml(reply)}</div></div>`;
    } catch (err) {
      const loadingEl = document.getElementById(loadingId);
      if (loadingEl) loadingEl.remove();
      messagesBox.innerHTML += `<div class="aw-chat-msg bot"><div class="aw-chat-bubble">⚠️ Unable to reach server. Please try again later.</div></div>`;
    }
    messagesBox.scrollTop = messagesBox.scrollHeight;
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();
