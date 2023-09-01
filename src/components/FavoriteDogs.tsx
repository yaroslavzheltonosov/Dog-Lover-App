import React, { useState, useContext } from 'react';
import { DogContext } from '../App';
import Navbar from './Navbar';
import Footer from './Footer';
import Dog from './Dog';
import useDogMatch from '../services/useDogMatch';
import Modal from './Modal';

import styles from "./FavoriteDogs.module.css";

export default function FavoriteDogs() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const context = useContext(DogContext);
  const { stateContext: { favoriteDogs, loggedIn }, setStateContext } = context;

  const request = useDogMatch();

  const handleClearAll = () => {
    setStateContext((prevState) => ({...prevState, favoriteDogs: []}));
  };

  const handleMatch = () => {
    request.getDogMatch();
    setIsModalOpen(true);
  };

  const handleOnModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <Navbar />
      {!loggedIn ? (
        <div className={styles.LoginMessageContainer}>
            Fetch even more joy: Log in to explore your favorite dogs!
        </div>
      ) : (
        <>
          {favoriteDogs.length > 0 ? (
            <div className={styles.ButtonsContainer}>
              <button className={styles.ClearAllButton} onClick={handleClearAll} disabled={request.isLoading}>Clear All</button>
              <button className={styles.MatchButton} onClick={handleMatch} disabled={request.isLoading}>{request.isLoading ? 'Preparing a match for you...' : 'Generate a match'}</button>
            </div>
          ) : (
            <div className={styles.NoFavoriteDogsMessage}>
              You do not have any favorite dogs yet!
            </div>
          )}
          {request.matchedDog && !request.isLoading && (
            <Modal title='You got a match!' content={<Dog {...request.matchedDog} isMatch={true} />} isOpen={isModalOpen} onClose={handleOnModalClose}/>
            
          )}
          <div className={styles.FavoriteDogsContainer}>
            {favoriteDogs?.map(({ id, breed, age, name, img, zip_code }) => {
              return (
                <Dog
                  key={id}
                  breed={breed}
                  age={age}
                  name={name}
                  img={img}
                  zip_code={zip_code}
                  id={id}
                />
              );
            })}
          </div>
        </>
      )}
      <Footer 
        showButtonSection={false}
      />
    </>
  );
}