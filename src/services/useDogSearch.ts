import { useState } from "react";
import { useContext } from "react";
import { DogContext } from "../App";
import { handleClearContext } from "../App";

interface Props {
  dogBreed?: string;
  zipCode?: string;
  ageMin?: string;
  ageMax?: string;
}

const useDogSearch = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dogBreed , zipCode, ageMin, ageMax } = props;
  const context = useContext(DogContext);
  const queryParams = new URLSearchParams();

  if (dogBreed) {
    queryParams.append("breeds", dogBreed);
  }
  if (zipCode) {
    queryParams.append("zipCodes", zipCode);
  }
  if (ageMin) {
    queryParams.append("ageMin", ageMin);
  }
  if (ageMax) {
    queryParams.append("ageMax", ageMax);
  }

  const searchDogs = () => {
    setIsLoading(true);
    fetch(
      `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`,
      {
        method: "GET",
        credentials: "include",
      },
    )
      .then((response) => {
        if (response.ok) {
          return response.json().then(({resultIds, next, total}) => {
            if (total / context.stateContext.currentPage > 25) {
              context.setStateContext((prevState) => ({...prevState, nextQueryParams: next}));
            } else {
              context.setStateContext((prevState) => ({...prevState, nextQueryParams: ''}));
            }
            getSelectedDogs(resultIds);
          });
        } else {
          handleClearContext(context);
        }
      })
      .catch((error) => {
        setIsLoading(false)
        handleClearContext(context);
      });
  };

  const getSelectedDogs = (dogIds: Array<string>) => {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      body: JSON.stringify(dogIds),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((response) => {
            context.setStateContext((prevState) => ({
              ...prevState,
              selectedDogs: response,
            }));
          });
        } else {
          throw new Error(
            "For some reason, we were not able to display the dogs you requested.",
          );
        }
      })
      .catch((error) => {
        handleClearContext(context);
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  const getNextDogs = (pagination: string) => {
    setIsLoading(true);
    fetch(
      `https://frontend-take-home-service.fetch.com${pagination}`,
      {
        method: "GET",
        credentials: "include",
      },
    )
      .then((response) => {
        if (response.ok) {
          return response.json().then(({resultIds, next, total, prev}) => {
            if (prev) context.setStateContext((prevState) => ({...prevState, prevQueryParams: prev}));
            if (total / context.stateContext.currentPage > 25) {
              context.setStateContext((prevState) => ({...prevState, nextQueryParams: next}));
            } else {
              context.setStateContext((prevState) => ({...prevState, nextQueryParams: ''}));
            }
            getSelectedDogs(resultIds);
          });
        } else {
          setIsLoading(false)
          handleClearContext(context);
        }
      })
      .catch((error) => {
        setIsLoading(false)
        handleClearContext(context);
      });
  }

  const getPreviousDogs = (pagination: string) => {
    setIsLoading(true);
    fetch(
      `https://frontend-take-home-service.fetch.com${pagination}`,
      {
        method: "GET",
        credentials: "include",
      },
    )
      .then((response) => {
        if (response.ok) {
          return response.json().then(({resultIds, next, prev}) => {
            if (next) context.setStateContext((prevState) => ({...prevState, nextQueryParams: next}))
            if (prev) {
              context.setStateContext((prevState) => ({...prevState, prevQueryParams: prev}));
            } else {
              context.setStateContext((prevState) => ({...prevState, prevQueryParams: ''}));
            }
            getSelectedDogs(resultIds);
          });
        } else {
          setIsLoading(false)
          handleClearContext(context);
        }
      })
      .catch((error) => {
        setIsLoading(false)
        handleClearContext(context);
      });
  }

  return {
    searchDogs,
    getNextDogs,
    getPreviousDogs,
    isLoading,
  };
};

export default useDogSearch;
