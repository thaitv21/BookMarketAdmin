import React, {Component} from 'react'
import {
    MuiThemeProvider
} from 'material-ui'
import {Redirect} from 'react-router'
import Admin from './Admin'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        if (!Admin.isLoggedIn) {
            props.history.push('/login')
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <h2>Dashboard</h2>
            </MuiThemeProvider>
        )
    }
}