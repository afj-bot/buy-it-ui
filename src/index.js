import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Loading from "./components/loader/Loading";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import PublicRoute from './components/auth/PublicRoute';
import { AUTH_ROUTES, PUBLIC_ROUTES } from './constants';
import LocalizeProvider from './service/providers/LocalizeProvider';


const App = React.lazy(() => import("./App"));
const Login = React.lazy(() => import("./pages/Login"));
const ForgotPassoword = React.lazy(() => import("./pages/forgotPassword/ForgotPassoword"));

class Index extends React.Component {

  renderLogin = () => (
    <PublicRoute>
      <App>
        <Login />
      </App>
    </PublicRoute>
  );

  renderMyProfile = () => (
    <AuthenticatedRoute>
    </AuthenticatedRoute>
  );

  render() {
    return (
      <Router>
        <Suspense fallback={<Loading open />}>
          <Routes>
            <Route path={PUBLIC_ROUTES.DASHBOARD} element={<App />} />
            <Route path={PUBLIC_ROUTES.LOGIN} element={this.renderLogin()} />
            <Route path={PUBLIC_ROUTES.FORGOT_PASSWORD} element={<ForgotPassoword />} />
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
    <LocalizeProvider>
      <Index />
    </LocalizeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
