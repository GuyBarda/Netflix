import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtoms';
import { Movie } from '../typings';
import requests from '../utils/requests';
import useAuth from '../hooks/useAuth';

import Hero from '../components/Hero';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
import Modal from '../components/Modal';
import Plans from '../components/Plans';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import payments from '../lib/stripe';
import useSubscription from '../hooks/useSubscription';

interface Props {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
    products: Product[];
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
    const { loading, user } = useAuth();
    const showModal = useRecoilValue(modalState);
    const subscription = useSubscription(user);

    if (loading || subscription === null) return null;
    if (!subscription) return <Plans products={props.products} />;

    return (
        <div
            className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
                showModal && '!h-screen overflow-hidden'
            }`}
        >
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
                <Hero movies={props.netflixOriginals} />
                <section className="md:space-y-24">
                    {genres.map((genre) => (
                        <MovieList
                            title={genre}
                            key={genre}
                            movies={
                                props[genre as keyof typeof props] as Movie[]
                            }
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
    const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
        .then((res) => res)
        .catch((err) => console.log(err));
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
            products,
        },
    };
};
