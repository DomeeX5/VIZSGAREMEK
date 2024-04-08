import {createContext, ReactNode, useContext, useState} from "react";
import '../../styles/LogoutDesign.css'
import {LogoutPanel} from "./LogoutPanel.tsx";

interface AuthContextProvider {
    isLoggedIn: boolean;
    token: string | null;
    login: (accessToken: string) => void;
    logout: () => void;
    showLogoutPanel: boolean;
}

interface Props {
    children: ReactNode
}


const AuthContext = createContext<AuthContextProvider | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [showLogoutPanel, setShowLogoutPanel] = useState(false);
    const login = (accessToken: string) => {
        sessionStorage.setItem("token", accessToken);
        setToken(accessToken);
    };
    const logout = () => {
        setShowLogoutPanel(true);
    };

    const handleLogoutConfirm = () => {
        sessionStorage.removeItem("token");
        setToken(null);
        setShowLogoutPanel(false);
    };

    const handleLogoutCancel = () => {
        setShowLogoutPanel(false);
    };


    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn: token !== null, token, login, logout, showLogoutPanel }}>
                {children}
            </AuthContext.Provider>
            {showLogoutPanel && (
                <LogoutPanel onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
            )}
        </>
    );
};

export const useAuth = (): AuthContextProvider => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
