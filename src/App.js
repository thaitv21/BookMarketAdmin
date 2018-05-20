import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    MuiThemeProvider,
    AppBar,
    FlatButton
} from 'material-ui'
import AppRouter from './AppRouter'
import Admin from './Admin'
import {Link, BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
    render() {
        const buttonStyle = {
            hoverColor: 'transparent',
            color: 'white'
        };
        const rightButtons = (
            <div>
                <Link to="/dashboard"><FlatButton label="Dashboard" style={buttonStyle}/></Link>
                <Link to="/user-management"><FlatButton label="User" style={buttonStyle}/></Link>
                <Link to="/book-management"><FlatButton label="Book" style={buttonStyle}/></Link>
                {
                    Admin.isLoggedIn &&
                    <Link to="/login" onClick={this.logout.bind(this)}><FlatButton label="Logout" style={buttonStyle}/></Link>
                }
            </div>
        );
        return (
            <Router>
                <div id="container" style={{backgroundColor: '#e5e5e5'}}>
                    <MuiThemeProvider className="App">
                        <AppBar
                            title="AdminLTE"
                            style={{alignItems: 'center', justifyContent: 'center'}}
                            showMenuIconButton={false}
                            children={rightButtons}/>
                    </MuiThemeProvider>
                    <AppRouter/>
                </div>
            </Router>
        );
    }

    logout() {
        Admin.isLoggedIn = false;
    }
}

export default App;
