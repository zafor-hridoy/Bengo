import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      className="p-4 border-t backdrop-blur-sm"
      style={{
        background: `linear-gradient(to top, rgba(var(--primary), 0.03), transparent)`,
        borderColor: 'rgba(100, 116, 139, 0.3)'
      }}
    >
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 animate-fade-in-scale">
          <div className="relative inline-block group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg group"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-3">
        <div className="flex-1 relative group">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              isSoundEnabled && playRandomKeyStrokeSound();
            }}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl py-3 px-5 text-slate-200 placeholder-slate-400
            transition-all duration-300
            focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-slate-800/80 focus:shadow-lg focus:shadow-cyan-500/10
            hover:border-slate-600"
            placeholder="Type your message..."
          />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 rounded-xl border transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: imagePreview ? `rgba(var(--primary), 0.2)` : 'rgba(30, 41, 59, 0.6)',
            color: imagePreview ? `rgb(var(--primary))` : 'rgb(148, 163, 184)',
            borderColor: imagePreview ? `rgba(var(--primary), 0.5)` : 'rgba(51, 65, 85, 0.5)',
            boxShadow: imagePreview ? `0 10px 15px -3px rgba(var(--primary), 0.2)` : 'none'
          }}
          onMouseEnter={(e) => {
            if (!imagePreview) {
              e.currentTarget.style.color = `rgb(var(--primary))`;
              e.currentTarget.style.borderColor = `rgba(var(--primary), 0.3)`;
              e.currentTarget.style.backgroundColor = `rgba(var(--primary), 0.1)`;
            }
          }}
          onMouseLeave={(e) => {
            if (!imagePreview) {
              e.currentTarget.style.color = 'rgb(148, 163, 184)';
              e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.5)';
              e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.6)';
            }
          }}
          title="Attach image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          flex items-center gap-2 group text-white"
          style={{
            background: `linear-gradient(to right, rgb(var(--primary)), rgba(var(--primary), 0.8))`,
            boxShadow: `0 10px 15px -3px rgba(var(--primary), 0.3)`
          }}
          onMouseEnter={(e) => {
            if (text.trim() || imagePreview) {
              e.currentTarget.style.boxShadow = `0 20px 25px -5px rgba(var(--primary), 0.5)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(var(--primary), 0.3)`;
          }}
          title="Send message"
        >
          <SendIcon className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;