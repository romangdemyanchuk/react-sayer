import React, {Component} from 'react';
import Main from '../Main';
import './app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import Swipe from "../Swipe";

export default class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/main" component={Main}/>
            </Router>
        );
    }
};