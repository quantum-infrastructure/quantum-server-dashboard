import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/pages/index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import ApolloContextProvider from './context/apollo-context';
import { AuthProvider } from './context/authentication-context';
import Main from './components/main/main';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import PopupContextProvider from './components/popup/popup';
import FileUpload from './pages/dashboard/file-upload';
import {ApiLookUpContextProvider } from './context/api-look-up-context';
import GameInstance from './pages/dashboard/game-instance';
import CreateGameInstance from './pages/dashboard/game-instance/create-game-instance';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ApiLookUpContextProvider>
    <ApolloContextProvider>
      			<PopupContextProvider>

      <AuthProvider>

    <Router>
    <Main>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/file-upload" element={<FileUpload />} />
        <Route path="/dashboard/game-instance" element={<GameInstance />} />
        <Route path="/dashboard/game-instance/create-game-instance" element={<CreateGameInstance />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
      </Main>

    </Router>
    </AuthProvider>
    </PopupContextProvider>

    </ApolloContextProvider>
    </ApiLookUpContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
