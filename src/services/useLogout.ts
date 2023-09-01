import { useContext } from "react";
import { DogContext } from "../App";
import { useNavigate } from "react-router-dom";
import { handleClearContext } from "../App";

const useLogout = () => {
    const context = useContext(DogContext);
    const history = useNavigate();
    const handleLogout = () => {
        fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
            method: 'POST',
            credentials: 'include',
        }).then(() => {
            context.setStateContext((prevState) => ({...prevState, loggedIn: false, email: '', name: '', currentPage: 0, nextQueryParams: '', prevQueryParams: '', favoriteDogs: [], selectedDogs: []}));
            history("/");
        })
        .catch((error) => {
            handleClearContext(context, 'You have encountered an error. We are trying to log you out manually...');
        })
    };

    return {
        handleLogout,
    };
};

export default useLogout;