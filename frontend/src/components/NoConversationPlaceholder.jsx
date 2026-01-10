import BengoLogo from "./BengoLogo";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
      <div className="mb-4">
        <BengoLogo className="size-32" showText={true} />
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Select a conversation
        </h3>
        <p className="text-slate-400 text-base leading-relaxed">
          Choose a contact from the sidebar to start chatting or continue your previous conversations with friends.
        </p>
      </div>

      <div className="mt-8 flex gap-2">
        <div className="size-2 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="size-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
        <div className="size-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};


export default NoConversationPlaceholder;
