import React, { useState } from "react";
import { useContext } from "react";
import { DogContext } from "../App";
import useDogSearch from "../services/useDogSearch";

import styles from "./SearchForm.module.css";

interface Props {
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function SearchForm(props: Props) {
  const [dogBreed, setDogBreed] = useState<string>("");
  const [zipCode, setZipCodeBreed] = useState<string>("");
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const { targetRef } = props;

  const context = useContext(DogContext);
  const { stateContext: { loggedIn, name } } = context;

  const request = useDogSearch({ dogBreed, zipCode, ageMin, ageMax });

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    request.searchDogs();
  };

  const handleOnSubmitForm = () => {
    context.setStateContext((prevState) => ({...prevState, currentPage: 1, prevQueryParams: ''}));
  };

  if (!loggedIn) {
    return (
      <div className={styles.LoginMessageContainer}>
        <div>Oopsie-doodle!</div>
        <div>You have temporarily departed from the realm of Loginia, where pixelated possibilities await at every corner.</div>
        <div>Please, log-in and come back!</div>
      </div>
    )
  }

  return (
    <div className={styles.SearchFormContainer}>
      <div className={styles.GreetingMessage}>Hi, {name}!</div>
      <div className={styles.FormContainer} ref={targetRef}>
        <form onSubmit={handleSearch} className={styles.Form}>
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            placeholder="Breed"
            id="breed"
            onChange={(e) => setDogBreed(e.target.value)}
            className={styles.SearchInputField}
          />
          <label htmlFor="zipCode">ZipCode:</label>
          <input
            type="text"
            placeholder="ZipCode"
            id="zipCode"
            onChange={(e) => setZipCodeBreed(e.target.value)}
            className={styles.SearchInputField}
          />
          <label htmlFor="minimumAge">Minimum Age:</label>
          <input
            type="number"
            placeholder="Minimum Age"
            id="minimumAge"
            onChange={(e) => setAgeMin(e.target.value)}
            className={styles.SearchInputField}
          />
          <label htmlFor="maximumAge">Maximum Age:</label>
          <input
            type="number"
            placeholder="Maximum Age"
            id="maximumAge"
            onChange={(e) => setAgeMax(e.target.value)}
            className={styles.SearchInputField}
          />
          <button type="submit" className={styles.SubmitSearchValues} onClick={handleOnSubmitForm} disabled={request.isLoading}>
            Search Dogs
          </button>
        </form>
      </div>
      <div className={styles.LoadingMessage}>{request.isLoading && 'Loading...'}</div>
    </div>
  );
}
