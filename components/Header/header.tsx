'use client';

import { useEffect, useState } from 'react';
import { FaPlusCircle, FaUser } from 'react-icons/fa';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import AddMovieModal, { MovieData } from '../Header/addMovieModal';
import "../../components/Header/header.css"
import { useDarkMode } from '@/context/darkModeContext';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, error, isLoading } = useUser();
  const [isReloading, setIsReloading] = useState(false);
  const { isDarkMode, setIsDarkMode } = useDarkMode();


  useEffect(() => {
    const isReloading = localStorage.getItem('isReloading');
    setIsReloading(isReloading === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('isReloading', String(isReloading));
  }, [isReloading]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddMovie = (movieData: MovieData) => {
    console.log('Adding movie:', movieData);
    setIsReloading(true);
    setTimeout(() => {
      window.location.href = '/home';
    }, 1000);
  };

  const handleToggleChange = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('dark-mode', String(newMode));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', 'false');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('dark-mode');
    setIsDarkMode(isDarkMode === 'true');
  }, []);

  if (isLoading || isReloading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <header className="app-header">
      <div className="app-title">CineXpress</div>
      <div className="user-actions">
        <div className="wrapper">
          <input
            type="checkbox"
            name="checkbox"
            className="switch"
            checked={isDarkMode}
            onChange={handleToggleChange}
          />
        </div>
        <br />
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
        <Link href={`/user/${user?.name}`} className="user-icon-link">
          <FaUser size={24} />
        </Link>
      </div>
      <AddMovieModal isOpen={showModal} onRequestClose={closeModal} onCloseAndAddMovie={handleAddMovie} />
    </header>
  );
}

export default Header;