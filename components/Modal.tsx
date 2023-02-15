import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtoms';
import { db } from '../firebase';
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    onSnapshot,
    setDoc,
} from 'firebase/firestore';
import {
    CheckIcon,
    PlusIcon,
    ThumbUpIcon,
    VolumeOffIcon,
    VolumeUpIcon,
    XIcon,
} from '@heroicons/react/solid';
import MuiModal from '@mui/material/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';

import useAuth from '../hooks/useAuth';
import { Credits, Genre, Movie } from '../typings';
import { getTrailer, getSimilars, getCredits } from '../utils/requests';
import MovieList from './MovieList';

const Modal = () => {
    const [trailer, setTrailer] = useState(null);
    const [similarMovies, setSimilarMovies] = useState(null);
    const [muted, setMuted] = useState(true);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);
    const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
    const [credits, setCredits] = useState<Credits | null>(null);

    const [showModal, setShowModal] = useRecoilState(modalState);
    const [movie, setMovie] = useRecoilState(movieState);

    const { user } = useAuth();

    const toastOptions = {
        duration: 3000,
        style: {
            color: 'black',
            fontWeight: 'bold',
            padding: '15px',
            borderRadius: '5rem',
        },
    };

    const handleMyList = async () => {
        isAddedToMyList
            ? //prettier-ignore
              await deleteDoc(doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!))
            : //prettier-ignore
              await setDoc(doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),{...movie,});

        const msg = `${movie?.title} has been ${
            isAddedToMyList ? 'removed from' : 'added to'
        } My List.`;

        toast(msg, toastOptions);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (!user) return;

        const unsubscribe = onSnapshot(
            collection(db, 'customers', user.uid, 'myList'),
            ({ docs }) => setMovies(docs)
        );

        return () => unsubscribe();
    }, [db, movie?.id]);

    useEffect(
        () =>
            setIsAddedToMyList(
                movies.findIndex((result) => result.data().id === movie?.id) !==
                    -1
            ),
        [movies]
    );

    const loadSimilars = async (id: string) => {
        const res = await fetch(getSimilars(id));
        const similars = await res.json();
        setSimilarMovies(similars.results.slice(0, 5));
    };

    const loadVideo = async () => {
        const res = await fetch(getTrailer(movie!));
        const { videos, genres } = await res.json();
        const video = videos?.results?.find(
            ({ type }: { type: string }) => type === 'Trailer'
        );
        setTrailer(video?.key);
        if (genres) setGenres(genres);
    };

    const loadCredits = async (id: string) => {
        const res = await fetch(getCredits(id));
        const { cast, crew } = await res.json();

        const actors = cast
            .slice(0, 7)
            .map(({ name }: { name: string }) => name);

        const director = crew.find(({ job }: any) => job === 'Director');

        const writer = crew.find(
            ({ known_for_department }: { known_for_department: string }) =>
                known_for_department === 'Writing'
        );
        setCredits({
            cast: actors,
            director: director?.name,
            writer: writer?.name,
        });
    };

    useEffect(() => {
        if (!movie) return;

        loadVideo();
        loadSimilars(movie.id);
        loadCredits(movie.id);
    }, [movie]);

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
                <Toaster position="bottom-center" />
                <button
                    onClick={handleClose}
                    className="modal-btn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                >
                    <XIcon className="h-6 w-6"></XIcon>
                </button>

                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className=" flex space-x-2">
                            <button className=" flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                                <FaPlay className="h-7 w-7 text-black" />
                                Play
                            </button>

                            <button
                                className="modal-btn"
                                onClick={handleMyList}
                            >
                                {isAddedToMyList ? (
                                    <CheckIcon className="h-7 w-7" />
                                ) : (
                                    <PlusIcon className="h-7 w-7" />
                                )}
                            </button>
                            <button className="modal-btn">
                                <ThumbUpIcon className="h-7 w-7" />
                            </button>
                        </div>
                        <button
                            onClick={() => setMuted(!muted)}
                            className="modal-btn"
                        >
                            {muted ? (
                                <VolumeOffIcon className="h-6 w-6" />
                            ) : (
                                <VolumeUpIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="rounded-b-md bg-[#181818] px-10">
                    <div className="flex space-x-16 py-8">
                        <div className="space-y-6 text-lg">
                            <div className="flex items-center space-x-2 text-sm">
                                <p className="font-semibold text-green-400">
                                    {movie!.vote_average * 10}% Match
                                </p>
                                <p className="font-light">
                                    {movie?.release_date ||
                                        movie?.first_air_date}
                                </p>
                                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-sm">
                                    HD
                                </div>
                            </div>

                            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                                <p className="w-5/6">{movie?.overview}</p>
                                <div className="flex flex-col space-y-3 text-sm ">
                                    <div className="">
                                        <span className="text-[gray]">
                                            Genres:{' '}
                                        </span>
                                        {genres
                                            .map((genre) => genre.name)
                                            .join(', ')}
                                    </div>
                                    <div className="">
                                        <span className="text-[gray]">
                                            Original language:{' '}
                                        </span>
                                        {movie?.original_language}
                                    </div>
                                    <div className="">
                                        <span className="text-[gray]">
                                            Total votes:{' '}
                                        </span>
                                        {movie?.vote_count}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {similarMovies && (
                        <div className="py-8">
                            <MovieList
                                title="More like this"
                                movies={similarMovies}
                            />
                        </div>
                    )}

                    {credits && (
                        <div className="py-8 font-light ">
                            <h3 className="w-5/6 text-lg font-bold mb-3">
                                <span className="font-semibold">About</span>{' '}
                                {movie?.title}
                            </h3>
                            <div className="flex flex-col gap-1 ">
                                <div>
                                    <span className="text-[gray]">
                                        Playing:{' '}
                                    </span>
                                    {credits.cast.join(', ') || 'TBA'}
                                </div>
                                <div>
                                    <span className="text-[gray]">
                                        Director/s:{' '}
                                    </span>
                                    {credits.director || 'TBA'}
                                </div>
                                <div>
                                    <span className="text-[gray]">
                                        Write/s:{' '}
                                    </span>
                                    {credits.writer || 'TBA'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </MuiModal>
    );
};

export default Modal;
