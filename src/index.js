import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Loading from "./components/loader/Loading";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import PublicRoute from './components/auth/PublicRoute';
import { AUTH_ROUTES, PUBLIC_ROUTES } from './constants';


const App = React.lazy(() => import("./App"));
const Login = React.lazy(() => import("./pages/Login"));

class Index extends React.Component {

  renderLogin = () => (
    <PublicRoute>
      <Login />
    </PublicRoute>
  );

  renderMyProfile = () => (
    <AuthenticatedRoute>
      <App />
    </AuthenticatedRoute>
  );

  render() {
    return (
      <Router>
        <Suspense fallback={<Loading open />}>
          <Routes>
            <Route path={PUBLIC_ROUTES.LOGIN} element={this.renderLogin()} />
            <Route path={AUTH_ROUTES.MY_PROFILE} element={this.renderMyProfile()} />
          </Routes>
        </Suspense>
      </Router>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
