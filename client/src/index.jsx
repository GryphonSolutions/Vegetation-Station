import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import {
  Details,
  Home,
  Login,
  Messaging,
  Offers,
  Post,
  Submit,
} from './components';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </Provider>,
);
