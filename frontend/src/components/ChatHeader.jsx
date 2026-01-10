import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center backdrop-blur-sm border-b px-6 py-4 animate-slide-in-left"
      style={{
        background: `linear-gradient(to right, rgba(var(--primary), 0.05), rgba(var(--base-200), 0.3), rgba(var(--primary), 0.05))`,
        borderColor: 'rgba(100, 116, 139, 0.3)'
      }}
    >
      <div className="flex items-center space-x-4">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div
            className="w-14 rounded-full transition-all duration-300"
            style={{ boxShadow: `0 0 0 2px rgba(var(--primary), 0.5)` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(var(--primary), 0.7)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(var(--primary), 0.5)`;
            }}
          >
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="object-cover rounded-full"
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-100 font-semibold text-lg">{selectedUser.fullName}</h3>
          <p className="text-sm text-slate-400 flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="p-2.5 rounded-lg bg-slate-800/50 text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300 hover:scale-105 hover:rotate-90 group"
        title="Close chat"
      >
        <XIcon className="w-5 h-5 transition-transform" />
      </button>
    </div>
  );
}
export default ChatHeader;