import React, { useEffect, useState } from "react";
import Cards from "../../components/Student/Cards";
import axios from "axios";

function Student() {
  const [courses, setCourses] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [recentlyViewedCourses, setRecentlyViewedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/course/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Check if response data is an array and set it correctly
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error("Expected array but received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []); // Empty dependency array to fetch only once

  return (
    <div>
      
      <div className="grid grid-cols- gap-4 p-4">
      <Cards key={1} course={{
        title:"Data Structures and Algorithms",
        description: "This course offers a step-by-step approach to mastering Data Structures and Algorithms (DSA), tailored for beginners and intermediate learners who want to build a solid foundation for software development, technical interviews, and competitive programming.",
        courseImage: "https://cdn.hashnode.com/res/hashnode/image/upload/v1682619527416/170f2bcc-ad89-4885-9a64-105d4529a314.png"
      }}/>
        {/* {courses.map((course, index) => (
          <Cards key={index} course={course} />
        ))} */}
      </div>
    </div>
  );
}

export default Student;
