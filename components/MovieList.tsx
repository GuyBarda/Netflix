import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import { useRef, useState } from 'react';
import { Movie } from '../typings';
import MoviePreview from './MoviePreview';

interface Props {
    title: string;
    movies: Movie[];
}

const MovieList = ({ title, movies }: Props) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [isMove, setIsMove] = useState(false);

    const handleClick = (direction: string) => {
        setIsMove(true);
        if (listRef.current) {
            const { scrollLeft, clientWidth } = listRef.current;

            const scrollTo =
                direction === 'left'
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;
            listRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className=" space-y-0.5 md:space-y-2">
            <h1 className="capitalize w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {title.replace(/([A-Z])/g, ' $1')}
            </h1>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon
                    className={`carousel-icon ${!isMove && 'hidden'}`}
                    onClick={() => handleClick('left')}
                />
                <div
                    ref={listRef}
                    className="overflow-y-hidden flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
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
