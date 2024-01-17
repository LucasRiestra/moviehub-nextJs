// addmoviemodal.test.tsx

import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AddMovieModal from '@/components/Header/addMovieModal';
import Header from '@/components/Header/header';

global.fetch = jest.fn();

jest.mock('@auth0/nextjs-auth0/client', () => ({
  ...jest.requireActual('@auth0/nextjs-auth0/client'),
  useUser: jest.fn(),
}));

jest.mock('@/services/request.services', () => ({
  ...jest.requireActual('@/services/request.services'),
  uploadRequest: jest.fn(),
}));

test('creates a movie and checks if it is created', async () => {
  const mockApiResponse = {
    id: 0,
    name: "Test Movie",
    score: 80,
    genres: "Action, Adventure"
  };

  const mockUser = {
    email: 'test@example.com',
  };

  (global.fetch as jest.Mock).mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockApiResponse),
  });

  (require('@auth0/nextjs-auth0/client') as any).useUser.mockReturnValue({
    user: mockUser,
    error: null,
    isLoading: false,
  });
  
  (require('@/services/request.services') as any).uploadRequest.mockResolvedValue({
    secure_url: 'https://example.com/image.jpg',
  });

  const mockOnRequestClose = jest.fn();
  const mockOnCloseAndAddMovie = jest.fn();

  await act(async () => {
    render(
      <UserProvider user={mockUser}>
        <Header />
        <AddMovieModal
          isOpen={true}
          onRequestClose={mockOnRequestClose}
          onCloseAndAddMovie={mockOnCloseAndAddMovie}
        />
      </UserProvider>
    );
  });

  await act(async () => {
    const saveButtons = screen.getAllByTestId('create-movie');
    const saveButton = saveButtons[0];
    saveButton.click();
  });

  await waitFor(async () => {
    const nameInputs = await screen.findAllByTestId('name');
    expect(nameInputs.length).toBeGreaterThan(0);
    const scoreInputs = await screen.findAllByTestId('score');
    expect(scoreInputs.length).toBeGreaterThan(0);
    const genresInputs = await screen.findAllByTestId('genres');
    expect(genresInputs.length).toBeGreaterThan(0);
  });

  expect((require('@/services/request.services') as any).uploadRequest).toHaveBeenCalled();
});