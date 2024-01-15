import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AddMovieModal from '@/components/Header/addMovieModal';
import fetch from 'node-fetch';

// Assign fetch to global
(global as any).fetch = fetch;

// Mock user
const mockUser = {
  email: 'test@example.com',
  // other properties...
};

// Set environment variable
process.env.API_BASE_URL = 'http://localhost:3000/api';

test('calls the correct function when the save movie button is clicked', async () => {
  const mockOnCloseAndAddMovie = jest.fn();
  const mockOnRequestClose = jest.fn();

  await act(async () => {
    render(
      <UserProvider user={mockUser}>
        <AddMovieModal
          isOpen={true}
          onRequestClose={mockOnRequestClose}
          onCloseAndAddMovie={mockOnCloseAndAddMovie}
        />
      </UserProvider>
    );
  });

  const saveMovieButton = screen.getByTestId('create-movie');
  await act(async () => {
    fireEvent.click(saveMovieButton);
  });
});