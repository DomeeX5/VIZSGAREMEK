import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProvider {
    isLoggedIn: boolean;
    login: (accessToken: string) => void;
    logout: () => void;
}

interface Props {
    children: ReactNode
}

const AuthContext = createContext<AuthContextProvider | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(sessionStorage.getItem("token")));

    const login = (accessToken: string) => {
        sessionStorage.setItem("token", accessToken);
        setIsLoggedIn(true);
    };
    const logout = () => {
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProvider => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
