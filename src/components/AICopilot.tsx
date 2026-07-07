import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, FileText, Wand2, Tag, MessageCircle, Loader2 } from 'lucide-react';

interface AICopilotProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = [
  { icon: FileText, label: 'Generate a Quote',     prompt: 'Generate a professional interior design quote for a 2BHK apartment renovation in Mumbai.' },
  { icon: Wand2,    label: 'Write a Proposal',     prompt: 'Write an AI proposal for a luxury villa interior design project.' },
  { icon: Tag,      label: 'Suggest Pricing',      prompt: 'Suggest pricing for a modular kitchen installation including materials and labor.' },
  { icon: MessageCircle, label: 'Follow-up Email', prompt: 'Write a friendly follow-up email for a quote sent 5 days ago that has not been responded to.' },
];

interface Message { role: 'user' | 'ai'; text: string; }

const aiReplies = [
  `Here's a professional quote for your 2BHK renovation:\n\n**Living Room**\n• Sofa set (Italian leather) — ₹85,000\n• Curtains & blinds — ₹18,000\n• Flooring (Italian marble) — ₹1,20,000\n\n**Master Bedroom**\n• Wardrobe (modular) — ₹65,000\n• Bed frame + headboard — ₹48,000\n\n**Subtotal:** ₹3,36,000\n**GST (18%):** ₹60,480\n**Total: ₹3,96,480**\n\nShall I open this in the Quote Editor?`,
  `I've crafted a compelling proposal for the luxury villa project. Key highlights:\n\n• **Design Philosophy:** Timeless luxury meets functional living\n• **3D Visualization** included at no extra cost\n• **Project Timeline:** 12–16 weeks\n• **Premium material sourcing** from Italian & Scandinavian suppliers\n\nWould you like me to generate the full PDF proposal?`,
  `Based on current market rates for Mumbai:\n\n• Modular kitchen (10 ft): ₹1,80,000 – ₹2,50,000\n• Premium finishes add 20–35%\n• Installation: ₹15,000 – ₹25,000\n• Countertop (quartz): ₹45,000 – ₹80,000\n\n**Recommended quote range: ₹2,40,000 – ₹3,55,000**\n\nWant me to create a detailed line-item quote?`,
  `Subject: Following up on your interior design proposal\n\nHi [Client Name],\n\nI hope you're doing well! I wanted to gently follow up on the proposal I sent over last week for your project.\n\nI'd love to answer any questions or discuss any adjustments. Would a quick 15-minute call work this week?\n\nLooking forward to hearing from you!\n\nWarm regards,\nRiya`,
];

export function AICopilot({ open, onClose }: AICopilotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi Riya! I'm your AI copilot. I can generate quotes, write proposals, suggest pricing, and more. What can I help you with today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    setMessages(m => [...m, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    const replyIdx = Math.floor(Math.random() * aiReplies.length);
    setTimeout(() => {
      setMessages(m => [...m, { role: 'ai', text: aiReplies[replyIdx] }]);
      setLoading(false);
    }, 1800);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop on mobile */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 sm:hidden bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="ai-panel"
            style={{
              bottom: 'calc(80px + env(safe-area-inset-bottom))',
              right: '1rem',
              width: 'min(380px, calc(100vw - 2rem))',
              maxHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-surface-3 dark:border-[#1A2B42] flex-shrink-0">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
                bg-gradient-to-br from-brand-500 to-brand-700
                shadow-[0_2px_8px_rgba(26,123,255,0.45)]">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-ink dark:text-white">AI Copilot</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-ink-tertiary">Ready to assist</span>
                </div>
              </div>
              <button onClick={onClose} className="btn-icon w-8 h-8">
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0 mt-1 mr-2">
                      <Sparkles size={11} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap
                    ${msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-md'
                      : 'bg-surface-1 dark:bg-[#111B2E] text-ink dark:text-slate-200 rounded-bl-md border border-surface-3 dark:border-[#1A2B42]'
                    }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={11} className="text-white" />
                  </div>
                  <div className="bg-surface-1 dark:bg-[#111B2E] border border-surface-3 dark:border-[#1A2B42] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-brand-400 dark:bg-brand-500" />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
                {suggestions.map(s => (
                  <motion.button
                    key={s.label}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => send(s.prompt)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5
                      bg-surface-2 dark:bg-[#111B2E]
                      border border-surface-3 dark:border-[#1A2B42]
                      rounded-2xl text-[11px] font-semibold text-ink-secondary
                      hover:bg-surface-3 dark:hover:bg-[#1A2B42]
                      transition-colors"
                  >
                    <s.icon size={12} />
                    {s.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t border-surface-3 dark:border-[#1A2B42] flex-shrink-0">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
                placeholder="Ask anything..."
                className="flex-1 px-3.5 py-2 text-sm rounded-2xl
                  bg-surface-1 dark:bg-[#111B2E]
                  border border-surface-3 dark:border-[#1A2B42]
                  text-ink dark:text-slate-100 placeholder-ink-tertiary
                  focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400
                  transition-all"
              />
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                  bg-brand-600 text-white
                  hover:bg-brand-500
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
