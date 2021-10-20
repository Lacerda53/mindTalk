import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

type Props = {
    children: ReactNode;
};

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}