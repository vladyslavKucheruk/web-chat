import { useCallback } from 'react';
import { StorageKeys } from '../utils/storage-keys';

export const useLocalStorage = () => {
    const setItem = useCallback((key: StorageKeys, value: string) => {
        localStorage.setItem(key, value);
    }, []);

    const getItem = useCallback((key: StorageKeys) => {
        return localStorage.getItem(key);
    }, []);

    return { setItem, getItem };
};
