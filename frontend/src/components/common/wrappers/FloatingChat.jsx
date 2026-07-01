import React, { useState } from 'react';
import { fetchAiRecommendation } from '../../../util/Requests';

function formatInline(text) {
  const nodes = [];
  const regex = /(\*\*[^*]+\*\*)|(https?:\/\/[^\s)]+)|(\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(<strong key={`${match.index}-bold`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('[')) {
      const label = token.slice(1, token.indexOf(']('));
      const href = token.slice(token.indexOf('](') + 2, -1);
      nodes.push(
        <a
          key={`${match.index}-mdlink`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-brand underline underline-offset-2 hover:text-brand-h break-all"
        >
          {label}
        </a>
      );
    } else {
      nodes.push(
        <a
          key={`${match.index}-url`}
          href={token}
          target="_blank"
          rel="noreferrer"
          className="text-brand underline underline-offset-2 hover:text-brand-h break-all"
        >
          {token}
        </a>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMessage(text) {
  const normalized = text.replace(/\r\n/g, '\n').replace(/â€¦/g, '...').replace(/â€”/g, '—');
  const blocks = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="pl-4 space-y-1.5 list-disc">
        {listItems}
      </ul>
    );
    listItems = [];
  };

  normalized.split('\n').forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }

    const bullet = line.match(/^[-*•]\s+(.*)$/);
    if (bullet) {
      listItems.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {formatInline(bullet[1])}
        </li>
      );
      return;
    }

    flushList();
    blocks.push(
      <p key={`p-${index}`} className="leading-relaxed">
        {formatInline(line)}
      </p>
    );
  });

  flushList();
  return <div className="space-y-2">{blocks}</div>;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about Cryptware services, pricing, or tech stack. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    const userMsg = typeof text === 'string' ? text.trim() : input.trim();
    if (!userMsg || loading) return;

    setInput('');
    setMessages((m) => [...m, { from: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
      const reply = await fetchAiRecommendation(userMsg, history);
      const botMsg = typeof reply === 'string' ? reply : reply?.text || reply?.error || 'Something went wrong. Please try again later.';
      setMessages((m) => [...m, { from: 'bot', text: botMsg }]);
    } catch {
      setMessages((m) => [...m, { from: 'bot', text: 'Something went wrong. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[400]">
      {isOpen && (
        <div className="mb-3 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-[0_18px_70px_rgba(15,23,42,0.18)] border border-white/60 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-paper-3/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-[0.78rem] font-bold tracking-tight text-ink">Cryptware Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 rounded-full text-[0.72rem] font-semibold bg-brand text-white transition-colors">
                AI Chat
              </button>
              <button
                onClick={() => window.open('https://wa.me/917490971996', '_blank')}
                className="px-3 py-1.5 rounded-full text-[0.72rem] font-semibold text-ink-3 hover:text-ink transition-colors"
              >
                WhatsApp
              </button>
            </div>
          </div>

          <div className="h-[320px] overflow-y-auto bg-paper/60 p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[0.82rem] leading-relaxed ${
                  msg.from === 'user'
                    ? 'self-end bg-brand text-white rounded-br-sm'
                    : 'self-start bg-white text-ink border border-paper-3 rounded-bl-sm'
                }`}
              >
                {msg.from === 'bot' ? renderMessage(msg.text) : msg.text}
              </div>
            ))}
            {loading && <div className="self-start px-3.5 py-2.5 rounded-2xl bg-white border border-paper-3 text-ink-3 text-[0.82rem]">Thinking...</div>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="px-3 py-3 border-t border-paper-3/60 flex items-center gap-2 bg-white"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something about Cryptware..."
              className="flex-1 bg-paper-2 border border-paper-3 rounded-full px-4 py-2.5 text-[0.84rem] text-ink placeholder:text-ink-3/50 focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand/15 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => handleSend(input)}
              className="w-10 h-10 rounded-full bg-brand hover:bg-brand-h text-white flex items-center justify-center transition-colors"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((s) => !s)}
        className="w-14 h-14 rounded-full bg-brand hover:bg-brand-h text-white flex items-center justify-center shadow-[0_12px_34px_rgba(6,163,218,0.32)] transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-3.074-.667l-3.072 1.04.616-2.906A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>
    </div>
  );
}
