import { createContext, ReactNode, useContext, useState } from "react";
import { LogoutPanel } from "./LogoutPanel";

/**
 * Represents the shape of the authentication context.
 */
interface AuthContextProvider {
    isLoggedIn: boolean; // Indicates whether the user is logged in.
    token: string | null; // The authentication token.
    login: (accessToken: string) => void; // Function to log in a user with an access token.
    logout: () => void; // Function to log out the current user.
    showLogoutPanel: boolean; // Indicates whether the logout confirmation panel is visible.
}

/**
 * Represents the props for the AuthProvider component.
 */
interface Props {
    children: ReactNode; // Child components.
}

/**
 * Context for managing authentication state.
 */
const AuthContext = createContext<AuthContextProvider | undefined>(undefined);

/**
 * Provider component for managing authentication state.
 * @param children - Child components.
 * @returns JSX.Element
 */
export const AuthProvider = ({ children }: Props): JSX.Element => {
    const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));
    const [showLogoutPanel, setShowLogoutPanel] = useState<boolean>(false);

    /**
     * Logs in a user with the provided access token.
     * @param accessToken - The access token used for authentication.
     */
    const login = (accessToken: string): void => {
        sessionStorage.setItem("token", accessToken);
        setToken(accessToken);
    };

    /**
     * Logs out the current user.
     */
    const logout = (): void => {
        setShowLogoutPanel(true);
    };

    /**
     * Handles confirmation of logout.
     */
    const handleLogoutConfirm = (): void => {
        sessionStorage.removeItem("token");
        setToken(null);
        setShowLogoutPanel(false);
    };

    /**
     * Handles cancellation of logout.
     */
    const handleLogoutCancel = (): void => {
        setShowLogoutPanel(false);
    };

    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn: token !== null, token, login, logout, showLogoutPanel }}>
                {children}
            </AuthContext.Provider>
            {showLogoutPanel && (
                <LogoutPanel show={showLogoutPanel} onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
            )}
        </>
    );
};

/**
 * Custom hook for accessing authentication context.
 * @returns The authentication context.
 */
export const useAuth = (): AuthContextProvider => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
