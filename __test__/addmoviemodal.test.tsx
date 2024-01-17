import React from 'react';
import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AddMovieModal from '@/components/Header/addMovieModal';
import Header from '@/components/Header/header';

test('renders the modal correctly', async () => {
  const mockOnRequestClose = jest.fn();
  const mockOnCloseAndAddMovie = jest.fn();

  await act(async () => {
    render(
      <UserProvider>
        <Header />
        <AddMovieModal
          isOpen={true}
          onRequestClose={mockOnRequestClose}
          onCloseAndAddMovie={mockOnCloseAndAddMovie}
        />
      </UserProvider>
    );
  });

  expect(screen.getByTestId('name')).toBeInTheDocument();
  expect(screen.getByLabelText('Score (0-100)')).toBeInTheDocument();
  expect(screen.getByLabelText('Genres (comma-separated)')).toBeInTheDocument();
  expect(screen.getByTestId('create-movie')).toBeInTheDocument();
});