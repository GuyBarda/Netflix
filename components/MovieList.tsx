import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import { DocumentData } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { Movie } from '../typings';
import MoviePreview from './MoviePreview';

interface Props {
    title: string;
    movies: Movie[] | DocumentData[];
}

const MovieList = ({ title, movies }: Props) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [isMove, setIsMove] = useState(false);

    const handleClick = (direction: string) => {
        setIsMove(true);

        const { current } = listRef;
        if (!current) return;

        const { scrollLeft, clientWidth } = current;
        const left =
            direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;
        current.scrollTo({ left, behavior: 'smooth' });
    };

    return (
        <div className=" space-y-2 md:space-y-2 ">
            <h1 className="capitalize w-56 cursor-pointer text-sm text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {title.replace(/([A-Z])/g, ' $1')}
            </h1>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon
                    className={`carousel-icon ${!isMove && 'hidden'}`}
                    onClick={() => handleClick('left')}
                />
                <div
                    ref={listRef}
                    className="flex items-center space-x-0.5 overflow-y-hidden overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
                >
                    {movies.map((movie) => (
                        <MoviePreview key={movie.id} movie={movie} />
                    ))}
                </div>
                <ChevronRightIcon
                    className="carousel-icon"
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    );
};

export default MovieList;
