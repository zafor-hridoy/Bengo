import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    // subscribeToMessages,
    // unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser?._id, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div
        className="flex-1 px-6 overflow-y-auto py-8 transition-all duration-500"
        style={{ background: `linear-gradient(to bottom, transparent, rgba(var(--primary), 0.03), transparent)` }}
      >
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"} animate-slide-in-${msg.senderId === authUser._id ? "right" : "left"}`}
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                {msg.senderId !== authUser._id && (
                  <div className="chat-header text-xs text-slate-400 mb-1">
                    {selectedUser.fullName}
                  </div>
                )}
                <div
                  className={`chat-bubble relative group backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${msg.senderId === authUser._id
                    ? "text-white shadow-lg"
                    : "text-emerald-950 border shadow-sm"
                    }`}
                  style={msg.senderId === authUser._id ? {
                    background: `linear-gradient(135deg, #22c55e, #16a34a)`,
                    boxShadow: `0 8px 20px -5px rgba(34, 197, 94, 0.4)`,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  } : {
                    background: `linear-gradient(135deg, #f0fdf4, #dcfce7)`,
                    borderColor: 'rgba(34, 197, 94, 0.2)'
                  }}
                >
                  {msg.image && (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg max-h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  {msg.text && <p className={`${msg.image ? 'mt-2' : ''} leading-relaxed`}>{msg.text}</p>}
                  <p className={`text-xs mt-2 flex items-center gap-1.5 ${msg.senderId === authUser._id ? 'opacity-80' : 'opacity-60'
                    }`}>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">📅</span>
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;