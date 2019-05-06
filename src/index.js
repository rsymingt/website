import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';

import Auth from "./auth.js";

import registerServiceWorker from './registerServiceWorker';

// Auth.authenticate(() => {
  ReactDOM.render( <App /> , document.getElementById('root'));
// });

registerServiceWorker();
