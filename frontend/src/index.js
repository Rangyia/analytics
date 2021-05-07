// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

// app
import App from './App';

// global css
import './assets/css/index.css'
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);



