import { render, screen, waitFor } from '@testing-library/react';
import { MovieDetail } from '@/app/movie/[id]/page';
import '@testing-library/jest-dom';
import { UserProvider } from '@auth0/nextjs-auth0/client';

global.fetch = jest.fn();

test('renders movie details', async () => {
    const mockApiResponse = {
        id: 0,
    };

    (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    render(
        <UserProvider>
            <MovieDetail params={{
                id: 0
            }} />
        </UserProvider>
    );

    const movieDetail = await waitFor(() => screen.getByTestId('movie-detail'));
    expect(movieDetail).toBeInTheDocument();
});
