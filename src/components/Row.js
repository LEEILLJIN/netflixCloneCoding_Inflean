import axios from '../api/axios';
import React, {useEffect, useState} from 'react'
import "./Row.css";
import MovieModal from './MovieModal';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({isLargeRow, title, id, fetchUrl}) {
    const [movies, setMovies] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [movieselected, setMovieSelected] = useState({})
    useEffect(() => {
      fetchMovieData();
    }, [fetchUrl]);
    // useEffect(() => {
    //     fetchMovieData();
    //   }, [fetchMovieData, fetchUrl]);
    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl)
        console.log('request', request)
        setMovies(request.data.results)
    }
    // const fetchMovieData = fetchMovieData(async () => {
    //     const request = await axios.get(fetchUrl);
    //     console.log("request", request);
    //     setMovies(request.data.results);
    //   },[fetchUrl]);
    
    //   useEffect(() => {
    //     fetchMovieData();
    //   }, [fetchMovieData]);
    const BASE_URL = "https://image.tmdb.org/t/p/original/"
    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }
  return (
    <section className='row'>
        <h2>{title}</h2>
        <Swiper 
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{//화면의 크기에 따라 슬라이드 개수를 다르게
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation  // arrow 버튼 사용 유무 
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지 
      >
        {/*<div className='slider'>
             <div className="slider__arrow-left">
                <span className="arrow"
                    onClick={() => {
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        
                        console.log(id)
                    }}
                >
                    {"<"}
                </span>
            </div> */}
            <div id = {id} className = "row__posters">
                {/**SEVERAL ROW__POSTER */}
                {movies.map((movie) => (
                    <SwiperSlide>
                        <img
                            key={movie.id}
                            className = {`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src = {`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            loading = "lazy"
                            alt = {movie.name}
                            onClick = {()=> handleClick(movie)}
                            />
                    </SwiperSlide>
                ))}
            </div>
            {/* <div className="slider__arrow-right">
                <span className="arrow"
                    onClick={() => {
                        document.getElementById(id).scrollLeft += window.innerWidth - 80;
                    }}
                >
                
                    {">"}
                </span>
            </div> 
        </div>*/}
        </Swiper>
            {
                modalOpen &&(
                    <MovieModal
                        {...movieselected}
                        setModalOpen = {setModalOpen}
                    />
                )
            }
    </section>
  )
}
