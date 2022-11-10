import { createContext, FC, PropsWithChildren, useState } from 'react';

export const AuthContext = createContext({ isAuth: false, setIsAuth: (state: boolean) => {} });

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};
