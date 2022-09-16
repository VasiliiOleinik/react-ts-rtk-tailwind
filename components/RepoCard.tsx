import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models';

const RepoCard = ({ repo }: { repo: IRepo }) => {

    const { addFavourite, removeFavourites } = useActions()
    const { favourites } = useAppSelector(state => state.github)

    const [isFavourite, setIsFavourite] = useState(favourites.includes(repo.html_url))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addFavourite(repo.html_url);
        setIsFavourite(true);
    }

    const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeFavourites(repo.html_url);
        setIsFavourite(false);
    }

    return (
        <div className='border py-3 px-5 ronded mb-2 jover:shadow-md hover:bg-gray-100 transition-all'>
            <a href={repo.html_url} target="_blanc">
                <h2 className='text-lg font-bild'>{repo.full_name}</h2>
                <p className='text-sm'>
                    Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                    Watchers: <span className='font-bold'>{repo.watchers}</span>
                </p>
                <p className='text-sm font-thin'>{repo.description}</p>

                {!isFavourite &&
                    <button
                        className='py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all'
                        onClick={addToFavourite}
                    >
                        Add
                    </button>
                }
                {isFavourite &&
                    <button
                        className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all'
                        onClick={removeFromFavourite}
                    >
                        Remove
                    </button>
                }
            </a>
        </div>
    );
}

export default RepoCard;