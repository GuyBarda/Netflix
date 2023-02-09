import Head from 'next/head';
import Hero from '../components/Hero';
import Header from '../components/Header';
import requests from '../utils/requests';
import { Movie } from '../typings';
import MovieList from '../components/MovieList';
import useAuth from '../hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtoms';
import Modal from '../components/Modal';

interface Props {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
}

const Home = (props: Props) => {
    const genres = [
        'netflixOriginals',
        'trendingNow',
        'topRated',
        'actionMovies',
        'comedyMovies',
        'horrorMovies',
        'romanceMovies',
        'documentaries',
    ];
    const { loading } = useAuth();
    const showModal = useRecoilValue(modalState);

    if (loading) return null;

    return (
        <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
                <Hero
                    randomMovie={
                        props.netflixOriginals[
                            Math.floor(
                                Math.random() * props.netflixOriginals.length
                            )
                        ]
                    }
                />
                <section className="md:space-y-7">
                    {genres.map((genre) => (
                        <MovieList
                            title={genre}
                            key={genre}
                            movies={props[genre as keyof typeof props]}
                        />
                    ))}
                </section>
            </main>
            {showModal && <Modal />}
        </div>
    );
};

export default Home;

export const getServerSideProps = async () => {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ]);
    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        },
    };
};
