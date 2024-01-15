import { render, screen, waitFor } from '@testing-library/react';
import { Home } from '@/app/home/page';
import '@testing-library/jest-dom';
import { UserProvider } from '@auth0/nextjs-auth0/client';

test('renders movie list', async () => {
    render(
        <UserProvider>
            <Home />
        </UserProvider>
    );

    const movieGrid = await waitFor(() => screen.getByTestId('movie-grid'));
    expect(movieGrid).toBeInTheDocument();
});