import { useMemo } from "react";
import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import SettingsPanel from "../components/SettingsPanel";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-slate-900 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="floating-particle absolute rounded-full blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              backgroundColor: `rgba(var(--primary), 0.2)`
            }}
          />
        ))}
      </div>

     
      <div
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl animate-pulse-slow opacity-20"
        style={{ backgroundColor: `rgb(var(--primary))` }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slower opacity-10"
        style={{ backgroundColor: `rgb(var(--secondary))` }}
      />

      <div className="relative w-full max-w-6xl h-[800px] animate-fade-in-up">
        <BorderAnimatedContainer
          color1={`rgb(var(--primary))`}
          color2={`rgb(var(--secondary))`}
        >
          <div
            className="w-80 backdrop-blur-md flex flex-col border-r border-slate-700/30 transition-colors duration-500"
            style={{ backgroundColor: `rgba(var(--base-200), 0.7)` }}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {activeTab === "chats" && <ChatsList />}
              {activeTab === "contacts" && <ContactList />}
              {activeTab === "settings" && <SettingsPanel />}
            </div>
          </div>
          <div
            className="flex-1 flex flex-col backdrop-blur-md transition-colors duration-500"
            style={{ backgroundColor: `rgba(var(--base-100), 0.6)` }}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;
