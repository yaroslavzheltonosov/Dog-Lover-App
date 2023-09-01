import React from "react";
import { DogValues } from "./components/DogList";

export interface User {
  loggedIn: boolean;
  email: string;
  name: string;
  selectedDogs: DogValues[];
  favoriteDogs: DogValues[];
  currentPage: number;
  nextQueryParams: string;
  prevQueryParams: string;
}

export interface DogContextProperties {
  stateContext: User;
  setStateContext: React.Dispatch<React.SetStateAction<User>>;
}
