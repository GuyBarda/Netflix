import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtoms';
import { DocumentData } from 'firebase/firestore';
import { Movie } from '../typings';

const MoviePreview = ({ movie }: { movie: Movie | DocumentData }) => {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    return (
        <div
            className="relative h-[270px] min-w-[180px] cursor-pointer transition duration-200 ease-out lg:h-[390px] lg:min-w-[260px] md:h-[315px] md:min-w-[210px] md:hover:scale-105"
            onClick={() => {
                setCurrentMovie(movie);
                setShowModal(true);
            }}
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${
                    movie.backdrop_path || movie.poster_path
                }`}
                className="rounded-sm object-cover md:rounded"
                alt=""
                fill
                sizes="260"
            />
        </div>
    );
};

export default MoviePreview;
