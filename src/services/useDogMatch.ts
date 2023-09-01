import { useState, useContext } from "react";
import { DogContext } from "../App";
import { handleClearContext } from "../App";

const useDogMatch = () => {
    const [match, setMatch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const context = useContext(DogContext);
    const { stateContext: { favoriteDogs } } = context;
    const favoriteDogIds = favoriteDogs.map((dog) => {
        return dog.id;
    })
    const matchedDog = favoriteDogs.find((dog) => {
        return dog.id === match;
    });
    const getDogMatch = () => {
        setIsLoading(true);
        fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
            method: 'POST',
            body: JSON.stringify(favoriteDogIds),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((response) => {
            if (response.ok) {
                return response.json().then(({match}) => {
                    setMatch(match);
                });
            } else {
                handleClearContext(context);
            }
        }).catch((error) => {
            handleClearContext(context);
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    return {
        getDogMatch,
        matchedDog,
        isLoading,
    };
};

export default useDogMatch;