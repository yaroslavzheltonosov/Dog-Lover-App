import React, { useState } from "react";
import Dog from "./Dog";
import { useContext } from "react";
import { DogContext } from "../App";

import styles from "./Dog.module.css";

export type DogValues = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

export default function DogList () {
  const [sortOrder, setSortOrder] = useState<string>("Alphabetical");
  const { selectedDogs } = useContext(DogContext).stateContext;

  const sortArray = (arr: DogValues[], order: string) => {
    return [...arr].sort((a, b) => {
      const breedComparison = a.breed.localeCompare(b.breed);
      return order === "Non-Alphabetical" ? -breedComparison : breedComparison;
    });
  };
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const sortedDogs = sortArray(selectedDogs, sortOrder);

  return (
    <>
      {selectedDogs.length > 0 && (
        <div className={styles.SortContainer}>
          <label htmlFor="sortOptions">Sort By Breed:</label>
          <select id="sortOptions" value={sortOrder} onChange={handleSortChange}>
            <option value="Alphabetical">Alphabetical</option>
            <option value="Non-Alphabetical">Non-Alphabetical</option>
          </select>
        </div>
      )}
      <div className={styles.DogsContainer}>
        {sortedDogs?.map(
          ({ breed, age, id, img, name, zip_code }: DogValues) => (
            <Dog
              key={id}
              id={id}
              breed={breed}
              age={age}
              img={img}
              name={name}
              zip_code={zip_code}
            />
          )
        )}
      </div>
    </>
  );
}
