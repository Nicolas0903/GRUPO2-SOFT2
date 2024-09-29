// Importaciones necesarias de React y react-router-dom
import React from 'react';
import { createHashRouter, Route, RouterProvider } from 'react-router-dom';

// Importaciones de tus vistas o componentes
import LoginPage from "./views/LoginPage/LoginPage";
//import RegisterPage from "./Views/Register/RegisterPage";
import InicioPage from "./views/InicioPage/InicioPage";
// Página en caso de error
import ErrorPage from './views/ErrorPage/ErrorPage';

// Creación del enrutador utilizando createHashRouter
const router = createHashRouter([
    { path: "/", element: <LoginPage /> },
    //{ path: "/registro", element: <RegisterPage /> },
    { path: "/inicio", element: <InicioPage /> },
    { path: "*", element: <ErrorPage /> },
]);

// Componente principal de la aplicación
const App = () => {
    //return <RouterProvider router={router} />;
};

// Exportación del componente App
export default App;