import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute.component';
import { useAuthContext } from './context/auth-context';
import Login from './features/auth/Login.component';
import Chat from './features/chat/Chat.component';
import Dashboard from './features/dashboard/Dashboard.component';
import PageNotFound from './features/page-not-found/PageNotFound.component';

const App = () => {
    const { isAuth } = useAuthContext();

    return (
        <Routes>
            <Route
                path=""
                element={
                    <ProtectedRoute isAllowed={false}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="auth" element={<Login />} />
            <Route
                path="chat"
                element={
                    <ProtectedRoute isAllowed={isAuth} redirectPath="../auth">
                        <Chat />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;
