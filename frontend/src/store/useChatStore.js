import { create } from 'zustand';
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadCounts: {},
  audioEnabled: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) !== false,
  toggleSound: () => {
    const newSoundState = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newSoundState);
    set({ isSoundEnabled: newSoundState });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: async (selectedUser) => {
    if (!selectedUser) {
      set({ selectedUser: null });
      return;
    }


    const currentUnreadCounts = get().unreadCounts;
    const { [selectedUser._id]: _, ...remainingCounts } = currentUnreadCounts;
    set({ selectedUser, unreadCounts: remainingCounts });

    try {
      await axiosInstance.put(`/messages/mark-read/${selectedUser._id}`);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      const chats = res.data;

      const newUnreadCounts = {};
      chats.forEach(partner => {
        if (partner.unreadCount > 0) {
          newUnreadCounts[partner._id] = partner.unreadCount;
        }
      });

      set({ chats, unreadCounts: newUnreadCounts });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    // Enable audio on user interaction
    set({ audioEnabled: true });

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set((state) => ({
        messages: state.messages.map((m) => (m._id === tempId ? res.data : m)),
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== tempId),
      }));
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;


    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, isSoundEnabled, unreadCounts } = get();
      const { authUser } = useAuthStore.getState();


      const isMessageFromSelectedUser = selectedUser && (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id);

      if (isMessageFromSelectedUser) {
        const currentMessages = get().messages;
        if (!currentMessages.find((m) => m._id === newMessage._id)) {
          set({ messages: [...currentMessages, newMessage] });
        }
      } else if (newMessage.senderId !== authUser._id) {
        set({
          unreadCounts: {
            ...unreadCounts,
            [newMessage.senderId]: (unreadCounts[newMessage.senderId] || 0) + 1,
          },
        });
      }


      if (isSoundEnabled && get().audioEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  clearChatState: () => {
    set({
      selectedUser: null,
      messages: [],
      chats: [],
      allContacts: [],
      unreadCounts: {}
    });
  }
}));
