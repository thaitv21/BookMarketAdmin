import React, {Component} from 'react'
import {
    MuiThemeProvider,
    TextField,
    RaisedButton
} from 'material-ui'
import './App.css'
import Admin from './Admin'

export default class Login extends Component {

    constructor(props) {
        super(props);
        console.log('Login', props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div id="loginContainer" style={styles.container}>
                    <div id="login" style={styles.formContainer}>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Login" primary={true} style={styles.loginBtn}
                                      onClick={this.login.bind(this)}/>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

    login() {
        if (this.state.username === "admin".toString() && this.state.password === "admin".toString()) {
            console.log('Login successful');
            this.props.history.push('/')
            Admin.isLoggedIn = true;
        }
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px'
    },
    formContainer: {
        width: 400,
        height: 400,
        shadowColor: 'black',
        boxShadow: '1px 3px 1px grey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    loginBtn: {
        margin: 15
    },
    textField: {
        backgroundColor: 'transparent'
    }

};


