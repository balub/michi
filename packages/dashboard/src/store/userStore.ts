import { User } from "@/types/User";
import { create } from "zustand";

interface IUserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user: User | null) => {
    set({
      user: user,
    });
  },
}));
