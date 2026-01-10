import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact, index) => (
        <div
          key={contact._id}
          className="group relative p-4 rounded-xl cursor-pointer 
          border transition-all duration-300 backdrop-blur-sm
          hover:scale-[1.02] hover:shadow-lg
          animate-slide-in-right"
          style={{
            animationDelay: `${index * 0.05}s`,
            background: `linear-gradient(to bottom right, rgba(var(--base-300), 0.4), rgba(var(--base-100), 0.2))`,
            borderColor: 'rgba(100, 116, 139, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `rgba(var(--primary), 0.5)`;
            e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(var(--primary), 0.2)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.2)';
            e.currentTarget.style.boxShadow = '';
          }}
          onClick={() => setSelectedUser(contact)}
        >
      
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: `linear-gradient(to right, transparent, rgba(var(--primary), 0.05), transparent)` }}
          />

          <div className="relative flex items-center gap-4">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"} flex-shrink-0`}>
              <div
                className="size-14 rounded-full transition-all duration-300"
                style={{ boxShadow: '0 0 0 2px rgba(100, 116, 139, 0.5)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px rgba(var(--primary), 0.5)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(100, 116, 139, 0.5)';
                }}
              >
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} className="object-cover rounded-full" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className="font-semibold truncate transition-colors"
                style={{ color: 'rgb(226, 232, 240)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = `rgb(var(--primary))`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(226, 232,240)';
                }}
              >
                {contact.fullName}
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${onlineUsers.includes(contact._id) ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
                {onlineUsers.includes(contact._id) ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;