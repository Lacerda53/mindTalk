import React from 'react';
import { ToastContainer } from 'react-toastify';
import { GlobalContextProvider } from './context';
import { Routes } from './routes/routes';
import { GlobalStyle } from './styles/global';

export const App: React.FC = () => {

    return (
        <GlobalContextProvider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <GlobalStyle />
            <Routes />
        </GlobalContextProvider>
    );
};