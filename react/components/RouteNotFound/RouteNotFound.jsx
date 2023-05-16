import {useParams} from "react-router-dom";

export const RouteNotFound = () => {
    const params = useParams();

    return (
        <h1>Erreur: La page "{params['*']}" n'existe pas</h1>
    )
}