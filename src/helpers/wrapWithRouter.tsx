import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

export const wrapWithRouter = (Component: ReactElement) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>{Component}</MemoryRouter>
        </QueryClientProvider>
    );
};
