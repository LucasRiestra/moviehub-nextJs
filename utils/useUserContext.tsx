'use client'

import { useContext } from "react";
import { userContext } from "../context/userContext";

export const useUserContext = () => useContext(userContext);