'use client'

import { createContext, useState } from "react";

export interface UserType {
    id: number,
    name: string,
    email: string,
    password: string,
    movies: Array<Movie>
}
export type Movie = {
    id?: number,
    name: string,
    score: string,
    poster_image: string,
    genres: string
}
export const userContext = createContext<{ currentUser: UserType | null, setCurrentLoggedUser: (loggedUser: UserType) => void }>
    ({ currentUser: null, setCurrentLoggedUser: () => { } });

export const UserContextProvider = ({ ...props }) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const setCurrentLoggedUser = (loggedUser: UserType) => {
        setCurrentUser(loggedUser);
    }
    return (
        <userContext.Provider value={{ currentUser, setCurrentLoggedUser }}>
            {props.children}
        </userContext.Provider>
    )
}