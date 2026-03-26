import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
    adminEmail: string,
    adminPassword: string,
    isUserLogged: boolean,
    updateEmail: (newEmail: string) => void,
    updatePassword: (newPassword: string) => void,
};

/**
 * Globally stores the login credentials, which consist of an email and a password, and the session status (true when the user is logged in).
 * 
 * It also allows to update these variables with the *changeSessionStatus*, *updateEmail* and *updatePassword* functions.
 */

export const useLoginStore = create<LoginState>()(
    persist((set) => ({
        adminEmail: "",
        adminPassword: "",
        isUserLogged: false,
        updateEmail: (newEmail: string) => set({
            adminEmail: newEmail
        }),
        updatePassword: (newPassword: string) => set({
            adminPassword: newPassword
        }),
    }),
        {
            name: 'login-storage',
        }
    )
);