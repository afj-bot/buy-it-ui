import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Loading from "./components/loader/Loading";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = React.lazy(() => import("./App"));

class Index extends React.Component {

  render() {
    return (
      <Router>
        <Suspense fallback={<Loading open />}>
          <Routes>
            <Route path="/test" element={<App />} />
            <Route path="/loader" element={<Loading open />} />
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
