import React, { useContext, useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";
// import { getToken } from "../../utils/auth";
// import { useRouteLoaderData } from "react-router-dom";
import Navbar from "./../../components/Student/Navbar";
import Cards from "../../components/Student/Cards";

function Student() {

    // const ctx = useContext(ProfileContext);

    const [courses, setCourses] = useState([]);
    const [profileData, setProfileData] = useState({});
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [recentlyViewedCourses, setRecentlyViewedCourses] = useState([]); // Store the recently viewed courses

    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     const username = JSON.parse(user).username;

    //     axios.get(`http://localhost:5000/api/student/${username}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + getToken(),
    //         }
    //     })
    //     .then((response) => {
    //         // console.log(response.data);
    //         const data = response.data;
    //         if (data.status === 'error' && data.message === 'Student not found') {
    //             localStorage.setItem('isProfileComplete', false);
    //             ctx.setIsProfileCreated(false);
    //         } else if (data.status === 'ok') {
    //             localStorage.setItem('isProfileComplete', true);
    //             ctx.setIsProfileCreated(true);
    //             localStorage.setItem('profileData', JSON.stringify(data.data));
    //             setProfileData(data.data);
    //             const randomQuote = getRandomQuote();
    //             setQuote(randomQuote);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    //     const fetchCourses = async () => {
    //         const response = await axios.get('http://localhost:5000/api/courses', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + getToken(),
    //             },
    //         });
    //         await setCourses(response.data.data.filter((course) => course.isPublic === true));
    //     };
    //     fetchCourses();
    // }, [ctx]);

    // useEffect(() => {
    //     setRecentlyViewedCourses(courses.filter((course) => profileData.recentlyVisited.includes(course._id)));
    // }, [courses, profileData]);

    // const { isAuthenticated } = useRouteLoaderData('student');

    // if (!isAuthenticated) {
    //     return (<div></div>);
    // }

    const cardData = ["Data Structure", "Software Security", "AI ML", "Data science"]; // Dummy array to iterate 4 cards


    return (
       <div>
        <Navbar />
        <div className="grid grid-cols-4 gap-4 p-4"> {/* Grid layout */}
        {cardData.map((_, index) => (
          <Cards key={index} />
        ))}
      </div>
       </div>
        
    );
}

export default Student;