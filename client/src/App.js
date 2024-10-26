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
import Student from './views/Student/Student';
import DSA_Course from './views/DSA_Course';
import StudentNavbar from './components/Student/Navbar';

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
      element: <StudentNavbar/>,
      children: [
        { path: "", element: <Student /> },
        { path: "course/DSA", element: <DSA_Course/>}
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
