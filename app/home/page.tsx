'use client';

import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import Header from '../../components/Header/header';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import UpdateMovieModal from '../../components/Home/updateMovieModal';
import { useUserContext } from '../../utils/useUserContext';
import { UserType } from '../../context/userContext';
import { createUser, getUserByEmail } from '@/services/user.services';
import Footer from '@/components/Footer/footer';
import { toast } from 'react-hot-toast';

interface Genre {
  genre: {
    name: string;
    id: string;
  };
}

interface Movie {
  id: number;
  name: string;
  poster_image: string;
  score: string;
  genres: Genre[];
}

export interface MovieData {
  name: string;
  poster_image: string;
  score: string;
  genres: string[];
}

  export const Home: React.FC = () => {
  const { user, isLoading } = useUser();
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { setCurrentLoggedUser } = useUserContext();

  useEffect(() => {
    (async function fetchUserData() {
      try {
        if (user?.email) {
          const userEmail = user.email;
          console.log('User email:', userEmail)
          const userData = await getUserByEmail(user?.email);
          const userInfo = userData && userData[1] as UserType;
          console.log('User data:', userData);
          if (userData && userData[1] !== null) {
            if (userInfo) {
              setCurrentLoggedUser(userInfo);
            }

          } else {
            const newUser = {
              name: user.name,
              email: user.email,
              password: user.email,
            }
            const createdUser = await createUser(newUser);
            setCurrentLoggedUser(createdUser);
            console.log('Created user:', createdUser)
          }

          if (!userData) {
            return;
          }

          const userId = userData[1].id;
          const url = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${url}/movie/user/${userId}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });

          if (response.ok) {
            const userMovies = await response.json();
            setMoviesData(userMovies);
          } else {
            console.error(`Error fetching user movies: ${response.statusText}`);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, [user]);

  const handleDelete = async (movieId: number) => {
    try {
      toast.success("Movie deleted successfully!", {
        duration: 1000,
      });
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/movie/${movieId}`, {
        method: 'DELETE',
        headers: {

        },
      });

      if (response.ok) {
        setMoviesData((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId))
      } else {
        console.error('Error deleting movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleUpdate = (movieId: number) => {
    const movieToUpdate = moviesData.find((movie) => movie.id === movieId);
    if (movieToUpdate) {
      setSelectedMovie(movieToUpdate);
      setIsUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedMovie(null);
  };

  function onCloseAndUpdateMovie(movieData: MovieData | null) {
    if (movieData === null) {
      console.log('Movie update canceled.');
    } else {
      console.log('Updating movie:', movieData);
    }
  }

  const handleUpdateMovie = (updatedMovieData: MovieData | null) => {
    if (updatedMovieData && selectedMovie) {
      console.log('Updating movie:', updatedMovieData);
      const movieData: MovieData = {
        name: updatedMovieData.name,
        poster_image: updatedMovieData.poster_image,
        score: updatedMovieData.score,
        genres: selectedMovie.genres.map(genreObj => typeof genreObj === 'string' ? genreObj : genreObj.genre.name),
      };
      onCloseAndUpdateMovie(movieData);
      toast.success("Movie updated successfully!", {
        duration: 2000,
      });
    } else {
      console.log('Movie update canceled.');
      onCloseAndUpdateMovie(null);
    }
  };

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className={styles.body}>
      <Header />
      <h1 className={`${styles.homeTitle}`}>List Of Movies</h1>
      <div className={styles.listOfMovies}>
        <section data-testid="movie-grid" className={styles.movieGrid}>
          {moviesData.length > 0 ? (
            moviesData.map((movie) => (
              <div data-testid="movie-card" key={movie.id} className={styles.movieCard}>
                <Link href={`/movie/${movie.id}`} className={styles.movieLink}>
                  <img src={movie.poster_image} alt={movie.name} className={styles.moviePoster} />
                  <h2 className={`${styles.movieTitle}`}>{movie.name}</h2>
                  <p className={`${styles.score}`}>IMDb {movie.score}</p>
                  <p className={`${styles.genre}`}>
                    {movie.genres.map((genreObj, index) => (
                      <span key={index}>
                        {typeof genreObj === 'string' ? genreObj : (genreObj.genre && genreObj.genre.name) || ''}
                        {index < movie.genres.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                </Link>
                <div className={styles.updateAndDeleteButtons}>
                  <button className={styles.updateButton} onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                  <button className={styles.updateButton} onClick={() => handleUpdate(movie.id)}>
                    Update
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h3 className={styles.noMovies} >No movies available. Add your favorite movies, please!</h3>
          )}
        </section>
      </div>
      <Footer />
      {isUpdateModalOpen && (
        <UpdateMovieModal
          isOpen={isUpdateModalOpen}
          onRequestClose={handleUpdateModalClose}
          onCloseAndUpdateMovie={handleUpdateMovie}
          initialMovieData={selectedMovie ? {
            name: selectedMovie.name,
            poster_image: selectedMovie.poster_image,
            score: selectedMovie.score,
            genres: selectedMovie.genres.map(genre => genre.genre.name),
          } : {
            name: '',
            poster_image: '',
            score: '',
            genres: [],
          }} selectedMovie={selectedMovie} />
      )}
    </div>
  );
};