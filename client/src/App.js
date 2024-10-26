import './App.module.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Navbar from './components/Home/Navbar';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Login from './views/Student/Login';
import Register from './views/Student/Register';
// import { loader as studentLoader } from './views/Student/Student';
import Student from './views/Student/Student'; // Replace with the correct path


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        { path: '/', element: <Home/> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
    {
      path: '/student',
      // id: 'student',
      // loader: studentLoader,
      element: <Student />,
      children: [
        // { path: '', element: <Student /> },
        // { path: 'course/:courseId', element: <ViewStudentCourse /> },
        // { path: 'create_profile', element: <CreateStudentProfile />, action: CreateStudentProfileAction },
        // { path: 'profile', element: <StudentProfile />},
        // { path: 'all_courses', element: <ViewAllCourses /> }
      ]
    },
  ]);

  return <RouterProvider router={router} />
}

export default App;
