import Image from "next/image"
import { baseUrl } from "../constants/movie"
import { Movie } from "../typings"

import { FaPlay, FaPlus } from 'react-icons/fa'

interface Props {
  randomMovie: Movie
}
const Hero = ({randomMovie}: Props) => {
  // const [movie, setMovie] = useState<Movie | null>(null)

  // useEffect(() => {
  //   setMovie(netflixOriginal[Math.floor(Math.random() * netflixOriginal.length)])
  // }, [])

  console.log(randomMovie);
  
  return (
      <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
          <div className="absolute top-0 left-0 h-[88vh] w-screen -z-10" >
              <Image 
              src={`${baseUrl}${randomMovie?.backdrop_path || randomMovie?.poster_path}`} alt="" 
              fill 
              style={{objectFit: 'cover'}}/>
          </div>

          <h1 className="font-bold text-shadow-md text-2xl lg:text-7xl md:text-4xl">{randomMovie.title}</h1>
          <h3 className="max-w-xs text-shadow-md text-xs md:max-w-lg lg:text-2xl">{randomMovie.overview}</h3>

          <div className="flex gap-3">
              <button className="btn-hero">
                    <FaPlay className="btn-hero-icon"/> Play
              </button>
              <button className="btn-hero" >
                    <FaPlus className="btn-hero-icon"/>
                    My List
              </button>
          </div>
      </div>
  )
}

export default Hero

