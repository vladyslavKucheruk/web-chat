import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../../hooks/use-local-storage';
import { StorageKeys } from '../../utils/storage-keys';

const Dashboard = () => {
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();

    useEffect(() => {
        const isAllowed = getItem(StorageKeys.IS_ALLOWED);

        if (isAllowed) {
            navigate('chat');
        } else {
            navigate('auth');
        }
    }, []);

    return (
        <div>
            <h2>
                <Link to="/auth">login</Link>
            </h2>
            <h2>
                <Link to="chat">chat</Link>
            </h2>
        </div>
    );
};

export default Dashboard;
