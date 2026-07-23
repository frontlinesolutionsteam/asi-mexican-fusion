"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { ButterflyEmblem } from "@/components/brand/ButterflyEmblem";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "¡Hola! I'm the Así helper 🦋 Ask me about our menu, hours, halal options, catering — or how to place an order.",
};

const SUGGESTIONS = [
  "Are you open now?",
  "Is everything halal?",
  "What's the shawarma tostadita?",
  "Do you cater?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? fallback() },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: fallback() }]);
    } finally {
      setLoading(false);
    }
  }

  function fallback() {
    return `I'm having trouble connecting right now — please call us at ${site.contact.phone} and we'll take great care of you.`;
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Así"}
        className="fixed bottom-5 right-5 z-[55] flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream-50 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 sm:h-16 sm:w-16"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <ButterflyEmblem className="h-9 w-9" variant="mono" color="#fbf6ea" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-[55] flex h-[30rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-2xl ring-1 ring-blue/10 sm:bottom-28"
          >
            <header className="flex items-center gap-3 bg-blue px-4 py-3.5 text-cream-50">
              <ButterflyEmblem className="h-9 w-9" variant="flags" />
              <div className="leading-tight">
                <p className="font-display text-lg">Ask Así</p>
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-gold">
                  Menu · Hours · Halal · Catering
                </p>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-terracotta text-cream-50"
                        : "bg-cream-100 text-ink"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-cream-100 px-4 py-3">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="h-2 w-2 animate-bounce rounded-full bg-ink-soft/60"
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-blue/20 bg-cream px-3 py-1.5 text-xs font-medium text-blue transition-colors hover:bg-blue hover:text-cream-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-cream-200 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the menu…"
                className="min-w-0 flex-1 rounded-full border border-cream-200 bg-cream px-4 py-2.5 text-sm outline-none placeholder:text-ink-soft/60 focus:border-gold"
                aria-label="Your message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-terracotta text-cream-50 transition-colors hover:bg-terracotta-700 disabled:opacity-40"
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12l16-8-6 16-3-7-7-1Z" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
