import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";

/**
 * Authentifizierungs-Context mit Session-Management und Provider für Login/Logout.
 */
const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession must be wrapped in a <SessionProvider />"
            );
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    setSession("loggedIn");
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
