import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

interface Session {
  user: User | null;
  logIn: (user: User) => void;
  logOut: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  accessToken: string;
  refreshToken: string;
}

export const useSessionStore = create<Session>()(
  persist((set) => ({
      user: null,
      logIn: (user: User) => set({user}),
      logOut: () => set({user: null}),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
