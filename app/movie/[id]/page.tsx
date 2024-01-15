'use client';

import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import Link from 'next/link';
import Header from '../../../components/Header/header';
import Footer from '../../../components/Footer/footer';
import { useParams, } from 'next/navigation';
import { NextRouter, useRouter } from 'next/router';



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

export const MovieDetail = ({params}: { params: { id: number } }) => {
  
  const [movie, setMovie] = useState<Movie | null>(null);
  

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${url}/movie/${params.id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [params.id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  console.log(movie);
  
  return (
    <>
    <Header/>
    <div className="movie-detail-container">
      <div data-testid="movie-detail" className="movie-detail-content">
        <img className="movie-detail-img" src={movie.poster_image} alt={movie.name} />
        <div className='movie-details-wrapper'>
          <h1 className='movieTitle'>{movie.name}</h1>
          <p className='score'>IMDb {movie.score}</p>
          <p className='genre'>
            {movie.genres && movie.genres.map((genreObj, index) => (
              <span key={index}>
                {genreObj.genre ? genreObj.genre.name : ''}
                {index < movie.genres.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
        <div>
          <Link href="/home">
            <button className="button-go-back">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default MovieDetail;
