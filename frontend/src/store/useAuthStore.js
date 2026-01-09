import {create} from 'zustand';
import { axiosInstance } from "../lib/axios";
export const useStore = create((set, get) => ({
    authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      // get().connectSocket();
    } catch (error) {
      if (error.response?.status !== 401) {
        console.log("Error in authCheck:", error);
      }
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
    
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      // toast.success("Account created successfully!");
      // get().connectSocket();
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));