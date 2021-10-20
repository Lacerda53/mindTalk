import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserProps } from "../@types/globalTypes";
import { database, DatabaseFirebase } from "../config/fireConfig";

type AuthContextProviderProps = {
    children: ReactNode;
}

type AuthContextType = {
    user: UserProps | undefined;
    logout: () => void;
    setUser: (value: UserProps) => void;
    databaseInstance: DatabaseFirebase | undefined;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserProps>();
    // const [loadingService, setLoadingService] = useState<boolean>(true);
    const [databaseInstance, setDatabaseInstance] = useState<DatabaseFirebase>();

    function logout() {
        setUser(undefined);
        toast.info('Você foi desconectado');
    }

    useEffect(() => {

        setDatabaseInstance(database);
    }, []);

    return (
        <AuthContext.Provider value={{ user, databaseInstance, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}