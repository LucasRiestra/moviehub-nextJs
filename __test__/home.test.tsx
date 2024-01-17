import { render, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react';
import Home from '@/app/home/page';
import '@testing-library/jest-dom';
import { UserProvider } from '@auth0/nextjs-auth0/client';

test('renders movie list', async () => {
    const { container } = render(
        <UserProvider>
            <Home />
        </UserProvider>
    );

    await waitForElementToBeRemoved(() => container.querySelector('.spinner-container'));

    const movieGrid = await waitFor(() => container.querySelector('.movieGrid'));
    expect(movieGrid).toBeInTheDocument();
});