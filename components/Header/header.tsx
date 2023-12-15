'use client';

import { useState } from 'react';
import { FaPlusCircle, FaUser } from 'react-icons/fa';
import { useUser } from '@auth0/nextjs-auth0/client';
import "./Header.css"
import Link from 'next/link';
import AddMovieModal, { MovieData } from '../Header/addMovieModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, error, isLoading } = useUser();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddMovie = (movieData: MovieData) => {
    console.log('Adding movie:', movieData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <header className="app-header">
      <div className="app-title">CineXpress</div>
      <div className="user-actions">
        {user ? (
          <>
            <p className="welcome-message">Welcome, {user.name || 'Guest'}!</p>
            <Link href="/api/auth/logout"><button className="sign-in-button">Log Out</button></Link>
          </>
        ) : (
          <Link href="/api/auth/login"><button className="sign-in-button">Log In</button></Link>
        )}
        <button className="add-movie-button" onClick={openModal}>
          <FaPlusCircle size={40} />
        </button>
        <Link href="/user" className="user-icon-link">
          <FaUser size={24} />
        </Link>
      </div>
      <AddMovieModal isOpen={showModal} onRequestClose={closeModal} onCloseAndAddMovie={handleAddMovie} />
    </header>
  );
}

export default Header;