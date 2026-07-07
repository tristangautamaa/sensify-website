import { useEffect, useRef, useState } from 'react';
import { SendHorizonal, Sparkles } from 'lucide-react';

/**
 * Local-only demo chat for the Sensify Assistant preview.
 * No API calls, no backend — sending a message appends a canned reply.
 */
const SEED_MESSAGES = [
  {
    id: 'seed-1',
    role: 'assistant',
    text: 'Tell me what you want to update on your website. I can turn it into a clear maintenance brief.',
  },
  {
    id: 'seed-2',
    role: 'user',
    text: 'We are launching a new collection next Friday. I need a landing page, 12 product updates, and WhatsApp CTA.',
  },
  {
    id: 'seed-3',
    role: 'assistant',
    text: 'Got it. I’ll prepare a campaign page structure, product update checklist, CTA copy, and a maintenance request for the Sensify team.',
  },
  {
    id: 'seed-4',
    role: 'user',
    text: 'Can you also make the page feel more premium than our marketplace listing?',
  },
  {
    id: 'seed-5',
    role: 'assistant',
    text: 'Yes. I’ll separate product storytelling, visual hierarchy, offer details, trust signals, and checkout path so the page feels like an owned brand experience.',
  },
];

const CANNED_REPLY =
  'I’ve drafted a structured website update request. Connect workflow automation later to send this directly into your maintenance queue.';

export default function AssistantChatPanel() {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);
  const nextId = useRef(0);

  // Keep the newest message in view inside the scrollable list.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const id = nextId.current++;
    setMessages((prev) => [
      ...prev,
      { id: `user-${id}`, role: 'user', text },
      { id: `assistant-${id}`, role: 'assistant', text: CANNED_REPLY },
    ]);
    setDraft('');
  };

  return (
    <div className="liquid-glass flex h-full min-h-[340px] flex-col rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.08)] p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(216,90,48,0.18)] text-[#D85A30]">
          <Sparkles size={16} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#F5F7FA]">Sensify Assistant</p>
          <p className="truncate text-[11px] text-[rgba(245,247,250,0.55)]">
            Website updates, catalog changes, campaign pages
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Sensify Assistant demo conversation"
        className="flex max-h-[300px] flex-1 flex-col gap-3 overflow-y-auto p-4"
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
      </div>

      {/* Input — local demo only */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-[rgba(255,255,255,0.08)] p-3"
      >
        <label htmlFor="assistant-demo-input" className="sr-only">
          Ask Sensify Assistant
        </label>
        <input
          id="assistant-demo-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask Sensify Assistant..."
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full border border-[rgba(245,247,250,0.14)] bg-[rgba(3,6,9,0.4)] px-4 py-2.5 text-[12.5px] text-[#F5F7FA] placeholder:text-[rgba(245,247,250,0.4)]"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D85A30] text-[#F5F7FA] transition-transform hover:scale-105"
        >
          <SendHorizonal size={15} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
