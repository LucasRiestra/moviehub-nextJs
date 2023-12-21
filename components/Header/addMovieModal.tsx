'use client'

import React, { useEffect, useState } from 'react';
import "../Header/addMovieModal.css"
import { useUserContext } from '../../utils/useUserContext';
import { addMovieToUser } from '@/services/user.services';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getUserByEmail } from '@/services/user.services';
import { UserType } from '../../context/userContext';
import { uploadRequest } from '@/services/request.services';
import Genre from '../Home/updateMovieModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';

interface AddMovieModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCloseAndAddMovie: (movieData: MovieData) => void;
}

interface Genre {
  genre: {
    name: string;
  };
}

export interface MovieData {
  name: string;
  poster_image: string;
  score: string;
  genres: [];
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onRequestClose, onCloseAndAddMovie }) => {
  const { user } = useUser();
  const { setCurrentLoggedUser } = useUserContext();
  const [movieData, setMovieData] = useState<MovieData>({
    name: '',
    poster_image: '',
    score: '',
    genres: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const userEmail = user.email;
          const userData = await getUserByEmail(userEmail);
          
          setCurrentLoggedUser(userData as unknown as UserType);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [user, setCurrentLoggedUser]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setMovieData((prevData) => ({
      ...prevData,
      [name]: name === 'genres' ? value.split(',') : value,
    }));
  };

  const [file, setfile] = useState<File>()


  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement> | null) => {
    if (event && event.target && event.target.files !== null) {
        const file: File = event.target.files[0];
        setfile(file);

        const cloudinaryImageUrl = await uploadRequest(file);

        if (cloudinaryImageUrl) {
            setMovieData((prevData) => ({
                ...prevData,
                poster_image: cloudinaryImageUrl,
            }));
        }
    }
};

const handleSaveMovie = async () => {
  try {
    if (!user || !user.email) {
      console.error('User or user email is undefined.');
      return;
    }

    const userByEmail = await getUserByEmail(user.email);

    if (!userByEmail || !userByEmail[1]) {
      console.error('Error fetching user by email');
      return;
    }

    const userId = userByEmail[1].id;

    const cloudinaryImageUrl = await uploadRequest(file);

    const newMovie = await addMovieToUser(
      userId,
      {
        ...movieData,
        genres: movieData.genres.map((genre: string) => ({ name: genre })),
        poster_image: cloudinaryImageUrl,
      }
    );
    setIsLoading(true);
    toast.success("Movie created successfully", {
      duration: 3000,
    });
    if (newMovie) {
      onCloseAndAddMovie(newMovie[0]);
      onRequestClose();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      console.error('Error at save movie');
    }
  } catch (error) {
    console.error('Error in the process', error);
  } 
};
  
  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Movie</h5>
            <button type="button" className="close" data-dismiss="modal" onClick={onRequestClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={movieData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="poster_image">Poster Image</label>
                <input
                  type={"file"}
                  className="form-control"
                  id="poster_image"
                  name="poster_image"
                  accept="image/*"
                  onChange={handleFileInput}
                />
                {movieData.poster_image && (
                  <img src={movieData.poster_image} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="score">Score (0-100)</label>
                <input
                  type="text"
                  className="form-control"
                  id="score"
                  name="score"
                  value={movieData.score}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genres">Genres (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  id="genres"
                  name="genres"
                  value={movieData.genres.join(',')}
                  onChange={handleInputChange}
                          />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveMovie}>
              Save Movie
            </button>
            {isLoading && (
              <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                </svg>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
