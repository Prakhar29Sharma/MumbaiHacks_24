import React, { useState } from 'react';


const ProgressBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
    return(
        <div class="bg-gray-300 rounded-full w-full h-2.5 mt-5">
        <div class="w-1/2 h-full rounded-full bg-green-500"></div>
        </div>

        );
    };
    
    export default ProgressBar;