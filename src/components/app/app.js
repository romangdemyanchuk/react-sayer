import React, {Component} from 'react';
import Main from '../Main';
import './app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" component={Main}/>
            </Router>
        );
    }
};