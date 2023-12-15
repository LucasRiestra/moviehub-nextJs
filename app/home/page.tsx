'use client';

import React, {  useEffect, useState } from 'react';
import styles from './home.module.css';
import Header from '../../components/Header/header';
import Link from 'next/link';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import UpdateMovieModal from '../../components/Home/updateMovieModal';
import { useUserContext } from '../../utils/useUserContext';
import { UserType, userContext } from '../../context/userContext';
import { getUserByEmail } from '@/services/user.services';
import Footer from '@/components/Footer/footer';


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

const Home: React.FC = () => {
   const { user } = useUser();
   const [moviesData, setMoviesData] = useState<Movie[]>([]);
   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
   const { setCurrentLoggedUser } = useUserContext();
   const [auth0User, setAuth0User] = useState<any>(null);
   

   useEffect(() => {
    (async function fetchUserData() {
      try {
        if (user?.email) {
          const userEmail = user.email;
          const userData = await getUserByEmail(userEmail);
          if (userData && userData.length > 0) {
            setCurrentLoggedUser(userData[1] as UserType);
          }
          setAuth0User(user);

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
      const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${url}/movie/${movieId}`, {
         method: 'DELETE',
         headers: {
           
         },
       });

       if (response.ok) {
         setMoviesData((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
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
    } else {
      console.log('Movie update canceled.');
      onCloseAndUpdateMovie(null);
    }
  };

  return (
    <div>
      <Header />
        <h1 className={styles.homeTitle}>List Of Movies</h1>
        <div className={styles.listOfMovies}>
        <section className={styles.movieGrid}>
          {moviesData.length > 0 ? (
            moviesData.map((movie) => (
              <div key={movie.id} className={styles.movieCard}>
                <Link href={`/movie/${movie.id}`} className={styles.movieLink}>
                  <img src={movie.poster_image} alt={movie.name} className={styles.moviePoster} />
                  <h2>{movie.name}</h2>
                  <p>IMDb {movie.score}</p>
                  <p>
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
          }} selectedMovie={selectedMovie}      />
      )} 
    </div>
  );
};

export default Home;
function onCloseAndUpdateMovie(movieData: MovieData) {
  throw new Error('Function not implemented.');
}

