import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import Login from './Login';
import BookManagement from './BookManagement'
import BookDetail from './BookDetail'
import Profile from './Profile'

export default class AppRouter extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/login" component={Login}/>
                <Route path="/user-management" component={UserManagement}/>
                <Route path="/book-management" component={BookManagement}/>
                <Route path="/book-detail/:bookId" component={BookDetail}/>
                <Route path="/profile/:userId" component={Profile}/>
            </div>

        )
    }
}