import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';

import HeaderMenu from './HeaderMenu';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const links = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const bgColor = () =>
        isScrolled ? 'bg-[#141414]' : 'bg-[#141414]/12 main-header';

    return (
        <header className={bgColor()}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <img
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                />

                <HeaderMenu links={links} />

                <ul className="hidden md:flex gap-4">
                    {links.map((link) => (
                        <li className="header-link" key={link}>
                            {link}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-4 text-sm font-light">
                <SearchIcon className="sm hidden h-6 w-6 sm:inline" />
                <p className="hidden lg:inline">Kids</p>
                <BellIcon className="h-6 w-6" />
                <Link href="/account">
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                </Link>
            </div>
        </header>
    );
};

export default Header;
