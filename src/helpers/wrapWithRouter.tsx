import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

export const wrapWithRouter = (Component: ReactElement, initRoute = '/') => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={[initRoute]}>{Component}</MemoryRouter>
        </QueryClientProvider>
    );
};
