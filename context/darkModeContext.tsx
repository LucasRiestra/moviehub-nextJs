'use-client';

import React, { createContext, useState, useContext, useEffect } from 'react';
const DarkModeContext = createContext({
    isDarkMode: false,
    setIsDarkMode: (value: ((prevMode: boolean) => boolean) | boolean) => { },
});



export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    console.log(setIsDarkMode);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('dark-mode');
        setIsDarkMode(isDarkMode === 'true');
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false');
        }
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => useContext(DarkModeContext);