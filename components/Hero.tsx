import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtoms';

import { FaPlay, FaPlus } from 'react-icons/fa';

import { baseUrl } from '../constants/movie';
import { Movie } from '../typings';

const Hero = ({ movies }: { movies: Movie[] }) => {
    const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    useEffect(() => {
        setRandomMovie(movies[Math.floor(Math.random() * movies.length)]);
    }, [movies]);

    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
                <Image
                    src={`${baseUrl}${
                        randomMovie?.poster_path || randomMovie?.backdrop_path
                    }`}
                    alt={randomMovie?.name || 'movie'}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
                {randomMovie?.title ||
                    randomMovie?.name ||
                    randomMovie?.original_name}
            </h1>
            <h3 className="max-w-xs text-sm text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                {randomMovie?.overview}
            </h3>

            <div className="flex space-x-3">
                <button className="btn-hero">
                    <FaPlay className="btn-hero-icon" />
                    Play
                </button>
                <button
                    className="btn-hero"
                    onClick={() => {
                        setCurrentMovie(randomMovie);
                        setShowModal(true);
                    }}
                >
                    <FaPlus className="btn-hero-icon" />
                    More Info
                </button>
            </div>
        </div>
    );
};

export default Hero;
