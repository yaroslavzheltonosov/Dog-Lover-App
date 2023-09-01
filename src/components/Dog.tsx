import React, { useContext } from "react";
import { DogContext } from "../App";

import styles from "./Dog.module.css";

interface Props {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  isMatch?: boolean;
}

export default function Dog(props: Props) {
  const { breed, img, name, age, zip_code, id, isMatch = false } = props;
  const context = useContext(DogContext);
  const isFavoritePage = window.location?.pathname === "/favorite";
  const isDogAlreadyAdded = context.stateContext.favoriteDogs.some((dog) => dog.id === id);
  const handleFavoriteDog = () => {
    if (isDogAlreadyAdded) return;
    context.setStateContext((prevState) => ({...prevState, favoriteDogs: [...context.stateContext.favoriteDogs, props]}));
  };
  const handleRemoveFromFavorite = () => {
    context.setStateContext((prevState) => ({...prevState, favoriteDogs: [...context.stateContext.favoriteDogs.filter((dog) => dog.id !== id)]}));
  };

  return (
    <div className={styles.DogElement}>
      <div className={styles.DogCart}>
        <div className={styles.DogImageContainer}>
          <img
            src={img}
            alt={name}
            loading="lazy"
            className={styles.DogImage}
          />
          <strong className={styles.DogName}>{name}</strong>
        </div>
        <div className={styles.DogDetails}>
          <strong>Details:</strong>
          <div className={styles.DogAge}>Age: {age}</div>
          <div className={styles.DogBreed}>Breed: {breed}</div>
          <div className={styles.DogZipCode}>Zip Code: {zip_code}</div>
        </div>
        {isFavoritePage ? (
          !isMatch && (
            <button className={styles.FavoriteDog} onClick={handleRemoveFromFavorite}>
              Remove from Favorite
            </button>
          )
        ) : (
          <button
            className={styles.FavoriteDog}
            onClick={handleFavoriteDog}
            disabled={isDogAlreadyAdded}
          >
            {isDogAlreadyAdded ? 'This dog has been added' : '⭐ Set as Favorite'}
            </button>
        )}
      </div>
    </div>
  );
}
