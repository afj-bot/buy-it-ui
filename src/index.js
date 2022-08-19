import React, { createElement, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Loading from "./components/loader/Loading";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./components/auth/AuthenticatedRoute";
import AuthenticateClosedRoute from "./components/auth/AuthenticateClosedRoute";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./constants";
import LocalizeProvider from "./service/providers/LocalizeProvider";

const App = React.lazy(() => import("./App"));
const Login = React.lazy(() => import("./pages/login/Login"));
const Registration = React.lazy(() => import("./pages/registration/Registration"));
const ForgotPassoword = React.lazy(() => import("./pages/forgotPassword/ForgotPassoword"));

const Product = React.lazy(() => import("./pages/product/Product"));
const MyProfile = React.lazy(() => import("./pages/profile/MyProfile"));

class Index extends React.Component {
  renderAuthenticateClosedRoute = (element) => (
    <AuthenticateClosedRoute>
      <App>
        {createElement(element)}
      </App>
    </AuthenticateClosedRoute>
  );

  renderAuthenticateRoute = (element) => (
    <AuthenticatedRoute>
      <App>
        {createElement(element)}
      </App>
    </AuthenticatedRoute>
  );

  render () {
    return (
      <Router>
        <Suspense fallback={<Loading open />}>
          <Routes>
            <Route path={PUBLIC_ROUTES.DASHBOARD} element={<App />} />
            <Route path={PUBLIC_ROUTES.DELIVERY} element={<App />} />
            <Route path={PUBLIC_ROUTES.CONTACT_US} element={<App />} />

            <Route path={PUBLIC_ROUTES.PRODUCTS} element={this.renderAuthenticateRoute(Product)} />
            <Route path={AUTH_ROUTES.MY_PROFILE} element={this.renderAuthenticateRoute(MyProfile)} />

            <Route path={PUBLIC_ROUTES.LOGIN} element={this.renderAuthenticateClosedRoute(Login)} />
            <Route path={PUBLIC_ROUTES.REGISTRATION} element={this.renderAuthenticateClosedRoute(Registration)} />
            <Route path={PUBLIC_ROUTES.FORGOT_PASSWORD} element={this.renderAuthenticateClosedRoute(ForgotPassoword)} />

          </Routes>
        </Suspense>
      </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
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
