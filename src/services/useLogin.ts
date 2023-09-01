import { useState, useContext } from "react";
import { DogContext } from "../App";
import { handleClearContext } from "../App";

interface User {
  email: string;
  name: string;
}

const useLogin = (user: User) => {
  const { name, email } = user;
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context = useContext(DogContext);

  const handleSubmit = () => {
    setIsLoading(true);
    fetch("https://frontend-take-home-service.fetch.com/auth/login", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setIsSuccessful(true);
          context.setStateContext((prevState) => ({...prevState, loggedIn: true, email: email, name: name, currentPage: 1, nextQueryParams: '', prevQueryParams: '', favoriteDogs: [], selectedDogs: []}))
        } else {
          setIsSuccessful(false);
          context.setStateContext((prevState) => ({...prevState, loggedIn: false, email: '', name: '', currentPage: 0, nextQueryParams: '', prevQueryParams: '', favoriteDogs: [], selectedDogs: []}));
          setError(
            "Ooops! Something went wrong in the magical realm of logins. Please, try again.",
          );
        }
      })
      .catch((error) => {
        setIsSuccessful(false);
        handleClearContext(context, 'Network Error.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isSuccessful,
    isLoading,
    handleSubmit,
    error,
  };
};

export default useLogin;
