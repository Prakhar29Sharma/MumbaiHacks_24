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
    {}
  ]);

  return <RouterProvider router={router} />
}

export default App;
