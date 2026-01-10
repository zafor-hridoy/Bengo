import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, unreadCounts } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  
  const sortedChats = [...chats].sort((a, b) => {
    const aUnread = unreadCounts[a._id] || 0;
    const bUnread = unreadCounts[b._id] || 0;
    if (aUnread !== bUnread) return bUnread - aUnread;
    const aOnline = onlineUsers.includes(a._id);
    const bOnline = onlineUsers.includes(b._id);
    return bOnline - aOnline;
  });

  return (
    <>
      {sortedChats.map((chat, index) => {
        const unreadCount = unreadCounts[chat._id] || 0;
        return (
          <div
            key={chat._id}
            className="group relative p-4 rounded-xl cursor-pointer 
            border transition-all duration-300 backdrop-blur-sm
            hover:scale-[1.02] hover:shadow-lg
            animate-slide-in-right"
            style={{
              animationDelay: `${index * 0.05}s`,
              background: `linear-gradient(to bottom right, rgba(var(--base-300), 0.4), rgba(var(--base-100), 0.2))`,
              borderColor: 'rgba(100, 116, 139, 0.2)',
              '--hover-border': `rgba(var(--primary), 0.5)`,
              '--hover-shadow': `rgba(var(--primary), 0.2)`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `rgba(var(--primary), 0.5)`;
              e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(var(--primary), 0.2)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.5)';
              e.currentTarget.style.boxShadow = '';
            }}
            onClick={() => setSelectedUser(chat)}
          >
           
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `linear-gradient(to right, transparent, rgba(var(--primary), 0.05), transparent)` }}
            />

            <div className="relative flex items-center gap-4">
              <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"} flex-shrink-0`}>
                <div
                  className="size-14 rounded-full ring-2 transition-all duration-300 group-hover:ring-2"
                  style={{
                    ringColor: 'rgba(100, 116, 139, 0.5)',
                    boxShadow: '0 0 0 2px rgba(100, 116, 139, 0.5)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 2px rgba(var(--primary), 0.5)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(100, 116, 139, 0.5)';
                  }}
                >
                  <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className="object-cover rounded-full" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className="text-slate-200 font-semibold truncate transition-colors group-hover:opacity-90"
                  style={{ color: 'rgb(226, 232, 240)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = `rgb(var(--primary))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgb(226, 232, 240)';
                  }}
                >
                  {chat.fullName}
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${onlineUsers.includes(chat._id) ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
                  {onlineUsers.includes(chat._id) ? 'Online' : 'Offline'}
                </p>
              </div>
              {unreadCount > 0 && (
                <div
                  className="text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
                  style={{ backgroundColor: `rgb(var(--primary))` }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ChatsList;