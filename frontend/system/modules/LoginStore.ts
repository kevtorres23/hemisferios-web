import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
    adminEmail: string,
    adminPassword: string,
    isUserLogged: boolean;
    changeSessionStatus: (newStatus: boolean) => void;
}


export const useLoginStore = create<LoginState>()(
    persist((set) => ({
        adminEmail: "arlet28torres@gmail.com",
        adminPassword: "h3m1sf3r10s",
        isUserLogged: false,
        changeSessionStatus: (newStatus: boolean) => set({
            isUserLogged: newStatus
        })
    }),
        {
            name: 'login-storage',
        }
    )
);