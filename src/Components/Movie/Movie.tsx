import React from 'react'
import { useParams, useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Movie: React.FC = () => {
    const { genre, movie }: any = useParams();
    const query = useQuery();

    console.log(query);

    return (
        <div>
            <h1>{genre}</h1>
            <h2>{movie}</h2>
        </div>)
}

export default Movie;
