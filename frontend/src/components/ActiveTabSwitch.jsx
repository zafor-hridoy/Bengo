import { useChatStore } from "../store/useChatStore";
import { Palette } from "lucide-react";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab transition-all duration-300 ${activeTab === "chats"
            ? "shadow-lg"
            : "text-slate-400 hover:text-slate-300"
          }`}
        style={activeTab === "chats" ? {
          backgroundColor: `rgba(var(--primary), 0.2)`,
          color: `rgb(var(--primary))`,
          boxShadow: `0 10px 15px -3px rgba(var(--primary), 0.2)`
        } : {}}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab transition-all duration-300 ${activeTab === "contacts"
            ? "shadow-lg"
            : "text-slate-400 hover:text-slate-300"
          }`}
        style={activeTab === "contacts" ? {
          backgroundColor: `rgba(var(--primary), 0.2)`,
          color: `rgb(var(--primary))`,
          boxShadow: `0 10px 15px -3px rgba(var(--primary), 0.2)`
        } : {}}
      >
        Contacts
      </button>

      <button
        onClick={() => setActiveTab("settings")}
        className={`tab transition-all duration-300 ${activeTab === "settings"
            ? "shadow-lg"
            : "text-slate-400 hover:text-slate-300"
          }`}
        style={activeTab === "settings" ? {
          backgroundColor: `rgba(var(--primary), 0.2)`,
          color: `rgb(var(--primary))`,
          boxShadow: `0 10px 15px -3px rgba(var(--primary), 0.2)`
        } : {}}
      >
        <Palette className="w-4 h-4" />
      </button>
    </div>
  );
}
export default ActiveTabSwitch;