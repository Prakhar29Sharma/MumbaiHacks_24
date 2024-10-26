import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';

const Cards = (props) => {
  // const [menuVisible, setMenuVisible] = useState(false);

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible);
  // };

  return (
    <div class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-4 max-w-md rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div class="flex items-center gap-2 px-4">
        <h3 class="text-lg text-gray-800 font-bold flex-1">{props.course.title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="16px" class="cursor-pointer fill-blue-600 shrink-0"
          viewBox="0 0 64 64">
          <path
            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
            data-original="#000000"></path>
        </svg>
      </div>

      <div class="min-h-[80px] ">
        <img src={props.course.courseImage ? props.course.courseImage : '#'} class="w-full my-2 h-[80px] object-cover" />
      </div>

      <div class="px-4">
        <p class="text-sm text-gray-600 leading-relaxed mt-5">{props.course.description}</p>

        {/* Progress bar */}
        <div>
          <ProgressBar />
        </div>

        <div class="mt-4 grid-cols-2 flex items-center flex-wrap gap-2">
          <Link to={"/student/course/DSA"} type="button"
            class="px-4 py-2 rounded-lg text-black text-sm tracking-wider bg-blue-100 hover:bg-blue-100 outline-black border-spacing-1">Enroll</Link>
        </div>
        
      </div>
    </div>
  )
};

export default Cards;
