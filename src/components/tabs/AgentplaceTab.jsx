/**
 * =================================================================
 * AgentplaceTab — src/components/tabs/AgentplaceTab.jsx
 * -----------------------------------------------------------------
 * Simple chatbot UI: message list (user bubbles right/blue, AI
 * bubbles left/white-gray) + text input bar at the bottom. Styled
 * consistently with the rest of the widget (cp- prefix, same color
 * tokens). NOTE: no Figma reference for this exact screen yet — layout
 * will be adjusted once available.
 * =================================================================
 */
import { useState, useRef, useEffect } from "react";
import { useAIAgent } from "../../hooks/Useaiagent.js";

function MessageBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`cp-flex ${isUser ? "cp-justify-end" : "cp-justify-start"}`}>
      <div
        className={`
          cp-max-w-[80%] cp-px-[12px] cp-py-[8px]
          cp-rounded-[12px]
          cp-text-[13px] cp-leading-snug
          ${isUser
            ? "cp-bg-cp-primary cp-text-white cp-rounded-br-[4px]"
            : "cp-bg-cp-bg-soft cp-text-cp-text-dark cp-rounded-bl-[4px]"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="cp-flex cp-justify-start">
      <div className="cp-bg-cp-bg-soft cp-rounded-[12px] cp-rounded-bl-[4px] cp-px-[14px] cp-py-[10px] cp-flex cp-gap-[4px] cp-items-center">
        <span className="cp-w-[6px] cp-h-[6px] cp-rounded-full cp-bg-cp-text-light cp-animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="cp-w-[6px] cp-h-[6px] cp-rounded-full cp-bg-cp-text-light cp-animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="cp-w-[6px] cp-h-[6px] cp-rounded-full cp-bg-cp-text-light cp-animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

export default function AgentplaceTab() {
  const { generateReply, isLoading, error } = useAIAgent();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Bonjour ! Je suis l'assistant Optical Center. Posez-moi une question sur nos horaires, services ou produits.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(e) {
    e.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    const newMessages = [...messages, { role: "user", text: question }];
    setMessages(newMessages);
    setInput("");

    const history = newMessages.map((m) => ({ role: m.role, text: m.text }));
    const reply = await generateReply({ question, history });

    if (reply) {
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Désolé, je n'ai pas pu répondre. Réessayez dans un instant." },
      ]);
    }
  }

  return (
    <div className="cp-flex cp-flex-col cp-h-full cp-min-h-[400px]">
      <div
        ref={scrollRef}
        className="
          cp-flex-1 cp-min-h-0 cp-overflow-y-auto
          cp-flex cp-flex-col cp-gap-[10px]
          cp-bg-white cp-rounded-[12px]
          cp-shadow-[0_2px_10px_rgba(16,24,40,0.08)]
          cp-p-[14px]
        "
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <p className="cp-text-[11px] cp-text-red-500 cp-text-center">{error}</p>
        )}
      </div>

      <form onSubmit={handleSend} className="cp-flex cp-items-center cp-gap-[8px] cp-mt-[10px]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          disabled={isLoading}
          className="
            cp-flex-1 cp-px-[12px] cp-py-[10px]
            cp-rounded-[10px] cp-border-0
            cp-bg-cp-bg-soft cp-text-[13px] cp-text-cp-text-dark
            cp-outline-none focus:cp-ring-2 focus:cp-ring-cp-primary
            cp-transition-all cp-duration-150
            disabled:cp-opacity-60
          "
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="
            cp-flex-shrink-0 cp-w-[38px] cp-h-[38px]
            cp-rounded-full cp-bg-cp-primary
            cp-flex cp-items-center cp-justify-center
            cp-border-0 cp-cursor-pointer
            cp-transition-colors cp-duration-150
            hover:cp-bg-cp-primary-dark
            disabled:cp-opacity-50 disabled:cp-cursor-not-allowed
          "
        >
          <svg viewBox="0 0 24 24" className="cp-w-[16px] cp-h-[16px] cp-text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>
    </div>
  );
}