import React from 'react';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/character/:id',
      element: <DetailPage />
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
