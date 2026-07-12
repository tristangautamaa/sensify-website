import { useEffect, useRef, useState } from 'react';
import { RotateCcw, SendHorizonal, Sparkles } from 'lucide-react';

import { assistantSuggestions } from '../../data/assistantKnowledge.js';
import { generateAssistantReply } from '../../utils/assistantEngine.js';

/**
 * Interactive local-only chat for the Sensify Assistant preview.
 * Replies come from the deterministic keyword engine over sample data —
 * no API calls, no backend, no personal data collected.
 */
const GREETING_MESSAGE = {
  id: 'seed-greeting',
  role: 'assistant',
  text: 'Hi, I’m the Sensify Assistant. I can recommend products, compare options, and answer questions about pricing, payment, shipping, and orders. What are you looking for?',
};

const MAX_MESSAGE_LENGTH = 300;

export default function AssistantChatPanel() {
  const [messages, setMessages] = useState([GREETING_MESSAGE]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef(null);
  const nextId = useRef(0);
  const replyTimer = useRef(0);

  // A fresh conversation reads from the top; once the visitor engages,
  // keep the newest message (or typing indicator) in view.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (messages.length === 1 && !isTyping) {
      list.scrollTop = 0;
      return;
    }
    list.scrollTop = list.scrollHeight;
  }, [messages, isTyping]);

  // Never leave a pending reply timer behind on unmount.
  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  const sendMessage = (rawText) => {
    const text = rawText.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text || isTyping) return;

    const id = nextId.current++;
    const reply = generateAssistantReply(text);

    setMessages((prev) => [...prev, { id: `user-${id}`, role: 'user', text }]);
    setDraft('');
    setIsTyping(true);

    // Short "thinking" pause so the reply feels conversational, not instant.
    replyTimer.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: `assistant-${id}`, role: 'assistant', text: reply.text }]);
      setIsTyping(false);
    }, 500 + Math.random() * 400);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(draft);
  };

  const handleReset = () => {
    window.clearTimeout(replyTimer.current);
    setMessages([GREETING_MESSAGE]);
    setDraft('');
    setIsTyping(false);
  };

  const isPristine = messages.length === 1 && !isTyping;

  return (
    <div className="liquid-glass flex h-full min-h-[420px] flex-col rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.08)] p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(216,90,48,0.18)] text-[#D85A30]">
          <Sparkles size={16} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#F5F7FA]">Sensify Assistant</p>
          <p className="truncate text-[11px] text-[rgba(245,247,250,0.55)]">
            Recommendations, comparisons, and order help
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset conversation"
          title="Reset conversation"
          className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(245,247,250,0.12)] text-[rgba(245,247,250,0.5)] transition-colors hover:border-[rgba(55,138,221,0.45)] hover:text-[#F5F7FA]"
        >
          <RotateCcw size={13} strokeWidth={2.25} aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Sensify Assistant conversation"
        className="assistant-scroll flex max-h-[440px] min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === 'user'
                ? 'ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#0C447C] px-3.5 py-2.5'
                : 'mr-auto max-w-[85%] rounded-2xl rounded-bl-md bg-[rgba(245,247,250,0.08)] px-3.5 py-2.5'
            }
          >
            <p className="text-[12.5px] leading-[1.55] text-[rgba(245,247,250,0.92)]">
              {message.text}
            </p>
          </div>
        ))}

        {isTyping && (
          <div className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[rgba(245,247,250,0.08)] px-3.5 py-3">
            <span className="sr-only">Sensify Assistant is typing</span>
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                aria-hidden="true"
                className="assistant-typing-dot h-1.5 w-1.5 rounded-full bg-[rgba(245,247,250,0.55)]"
                style={{ animationDelay: `${dot * 0.16}s` }}
              />
            ))}
          </div>
        )}

        {isPristine && (
          <div className="pt-1.5">
            <p className="mb-2 text-[9.5px] font-semibold tracking-[0.22em] text-[rgba(245,247,250,0.35)]">
              TRY ASKING
            </p>
            <div className="flex flex-wrap gap-1.5">
              {assistantSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border border-[rgba(245,247,250,0.1)] bg-[rgba(245,247,250,0.03)] px-2.5 py-1 text-left text-[10.5px] leading-[1.4] text-[rgba(245,247,250,0.62)] transition-colors hover:border-[rgba(55,138,221,0.5)] hover:bg-[rgba(55,138,221,0.08)] hover:text-[#F5F7FA]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input — anchored to the bottom of the panel */}
      <form
        onSubmit={handleSubmit}
        className="mt-auto flex items-center gap-2 border-t border-[rgba(255,255,255,0.08)] px-3 py-3"
      >
        <label htmlFor="assistant-demo-input" className="sr-only">
          Ask Sensify Assistant
        </label>
        <input
          id="assistant-demo-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Ask about products, payment, or shipping..."
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full border border-[rgba(245,247,250,0.14)] bg-[rgba(3,6,9,0.4)] px-4 py-2.5 text-[12.5px] text-[#F5F7FA] placeholder:text-[rgba(245,247,250,0.4)]"
        />
        <button
          type="submit"
          disabled={!draft.trim() || isTyping}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D85A30] text-[#F5F7FA] transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendHorizonal size={15} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
