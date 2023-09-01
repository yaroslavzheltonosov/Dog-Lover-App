import React from 'react';
import { useContext } from 'react';
import { DogContext } from '../App';
import useDogSearch from '../services/useDogSearch';

import styles from "./Footer.module.css";

interface Props {
  showButtonSection?: boolean;
  targetRef?: React.RefObject<HTMLDivElement>;
}

export default function Footer(props : Props) {
    const { showButtonSection = true, targetRef } = props;
    const currentYear = new Date().getFullYear();
    const context = useContext(DogContext);
    const { stateContext: { loggedIn, currentPage, nextQueryParams, prevQueryParams, selectedDogs } } = context;
    const isToShowButtons = showButtonSection && (loggedIn && currentPage);

    const request = useDogSearch({});

    const handleNextPage = () => {
      context.stateContext.currentPage++;
      request.getNextDogs(nextQueryParams);
    };

    const handlePreviousPage = () => {
      context.stateContext.currentPage--;
      request.getPreviousDogs(prevQueryParams);
    };

    const handleBackToTop = () => {
      if (targetRef?.current) {
        targetRef.current?.scrollIntoView({behavior: 'smooth'})
      }
    }

  return (
    <footer className={styles.Footer}>
      {isToShowButtons && (
        <div className={styles.ButtonSection}>
          <span>Current Page: {currentPage}</span>
          {nextQueryParams && (
            <button type="button" className={styles.NextPageButton} onClick={handleNextPage} disabled={request.isLoading}>
              Next Page
            </button>
          )}
          {prevQueryParams && (
            <button type="button" className={styles.PreviousPageButton} onClick={handlePreviousPage} disabled={request.isLoading}>
              Previous Page
            </button>
          )}
          {selectedDogs.length > 10 && (
            <button type="button" className={styles.BackToTopButton} onClick={handleBackToTop}>Back to Top</button>
          )}
        </div>
      )}
      <div className={styles.Copyright}>© Copyright {currentYear} Dog Lover App. All rights reserved.</div>
    </footer>
  )
}
