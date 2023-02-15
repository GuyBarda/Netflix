import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtoms';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import payments from '../lib/stripe';

import { Movie } from '../typings';
import requests from '../utils/requests';

import useAuth from '../hooks/useAuth';
import useList from '../hooks/useList';
import useSubscription from '../hooks/useSubscription';

import Hero from '../components/Hero';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
import Modal from '../components/Modal';
import Plans from '../components/Plans';

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
    const genres: string[] = [
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
    const myList = useList(user?.uid);

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
                <link
                    rel="icon"
                    href="https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico"
                />
            </Head>

            <Header />

            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
                <Hero movies={props.netflixOriginals} />
                {myList.length > 0 && (
                    <MovieList movies={myList} title={'My List'} />
                )}
                <section className="md:space-y-12 space-y-6">
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
    try {
        const promises = Object.values(requests).map((request) =>
            fetch(request).then((res) => res.json())
        );
        promises.push(
            getProducts(payments, {
                includePrices: true,
                activeOnly: true,
            })
        );

        const [
            netflixOriginals,
            trendingNow,
            topRated,
            actionMovies,
            comedyMovies,
            horrorMovies,
            romanceMovies,
            documentaries,
            products,
        ] = await Promise.all(promises);

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
    } catch ({ message }) {
        console.log(message);
    }
};
