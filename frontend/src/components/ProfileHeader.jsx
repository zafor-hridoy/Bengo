import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);


  const displayImage = selectedImg || authUser?.profilePic || "/avatar.png";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxSize = 800;
        let { width, height } = img;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);

        setSelectedImg(compressedBase64);
        await updateProfile({ profilePic: compressedBase64 });
      };
      img.src = reader.result;
    };
  };

  return (
    <div
      className="p-6 border-b transition-colors duration-500"
      style={{
        background: `linear-gradient(to bottom right, rgba(var(--base-300), 0.5), transparent)`,
        borderColor: 'rgba(100, 116, 139, 0.2)'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="avatar online">
            <button
              className="size-16 rounded-full overflow-hidden relative group transition-all duration-300"
              style={{ boxShadow: `0 0 0 2px rgba(var(--primary), 0.3)` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 2px rgba(var(--primary), 0.6)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 2px rgba(var(--primary), 0.3)`;
              }}
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={displayImage}
                alt="User image"
                className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <span className="text-white text-xs font-medium">Change</span>
              </div>
              {/* Pulse effect */}
              <div
                className="absolute -inset-1 rounded-full animate-pulse opacity-0 group-hover:opacity-100 -z-10"
                style={{ backgroundColor: `rgba(var(--primary), 0.2)` }}
              />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            <h3 className="text-slate-100 font-semibold text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className="p-2.5 rounded-lg bg-slate-800/50 text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300 hover:scale-105"
            onClick={logout}
            title="Logout"
          >
            <LogOutIcon className="size-5" />
          </button>

          <button
            className="p-2.5 rounded-lg bg-slate-800/50 text-slate-400 border border-slate-700/50 transition-all duration-300 hover:scale-105"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = `rgb(var(--primary))`;
              e.currentTarget.style.backgroundColor = `rgba(var(--primary), 0.1)`;
              e.currentTarget.style.borderColor = `rgba(var(--primary), 0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgb(148, 163, 184)';
              e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.5)';
            }}
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
            title={isSoundEnabled ? "Mute" : "Unmute"}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;