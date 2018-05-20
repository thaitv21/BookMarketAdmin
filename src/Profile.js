import React, {Component} from 'react'

import {
    MuiThemeProvider,
    CircularProgress,
    FlatButton,
    Dialog,
    TextField
} from 'material-ui'

import Image from 'material-ui-image'
import Avatar from './components/Avatar'
import API from './services/API'
import './Profile.css'

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userId: props.match.params.userId,
            bookList: [],
            showDialogBlock: false,
            reasonBlock: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        API.getProfile(this.state.userId, (result) => {
            this.setState({user: result.data.data.profile});
            console.log('user', result.data.data.profile);
            this.getBookList();
        }, (error) => {
            console.log('user error', error);
        })
    }

    render() {
        const user = this.state.user;
        return (
            <MuiThemeProvider>
                <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {!user && <CircularProgress size={60} style={{marginTop: 100}}/>}
                    {
                        user &&
                        <div style={styles.informationContainer}>
                            <Avatar size={100} url={user.avatar || ""}/>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '70%',
                                marginLeft: 20,
                                paddingTop: 5
                            }}>
                                <b>{user.username}</b>
                                <br/>
                                Điện thoại: {user.phone}
                                <br/>
                                <br/>
                                Địa chỉ: {user.address}
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '20%',
                                borderWidth: 1,
                                borderColor: 'black',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between'
                            }}>
                                <FlatButton
                                    label="Block"
                                    disableTouchRipple={true}
                                    labelStyle={styles.buttonLabelStyle}
                                    style={styles.button}
                                    onClick={this.handleBlockUser.bind(this)}/>
                                <FlatButton
                                    label="Gửi cảnh báo"
                                    disableTouchRipple={true}
                                    labelStyle={styles.buttonLabelStyle}
                                    style={styles.button}
                                    onClick={this.handleWarning.bind(this)}/>
                            </div>
                        </div>
                    }
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '84%',
                            backgroundColor: 'white'
                        }}>
                        {
                            user &&
                            this.renderItems()
                        }
                    </div>
                    <Dialog title="Block tài khoản này"
                            actions={this.actions}
                            modal={false}
                            open={this.state.showDialogBlock}>
                        <TextField
                            floatingLabelText="Lý do"
                            rows={1}
                            value={this.state.reasonBlock}
                            errorText={this.state.reasonBlock ? null : 'Nhập lý do'}
                            onChange={(event, value) => this.setState({reasonBlock: value})}
                            fullWidth={true}
                        />
                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }

    renderItems() {
        return this.state.bookList.map((item, index) => {
            return (
                <div style={{display: 'flex', flexDirection: 'column', marginRight: 20, padding: 10}} key={index}
                     onClick={() => this.props.history.push('/book-detail/' + item.id)}>
                    <div style={{width: 50, height: 180}}>
                        <Image src={item.image[0].link}/>
                    </div>
                    {item.name}
                </div>
            )
        })
    }

     actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            keyboardFocused={true}
            onClick={() => this.setState({showDialogBlock: false, reasonBlock: null})}
        />,
         <FlatButton
             label="Ok"
             primary={true}
             keyboardFocused={true}
             onClick={() => {
                 if (this.state.reasonBlock) {
                     this.setState({showDialogBlock: false, reasonBlock: null})
                 }
             }}
         />
    ];

    getBookList() {
        let params = {
            index: 0,
            count: 10,
            seller_id: this.state.userId
        };
        console.log(params);
        API.getListBook(params, (result) => {
            let list = result.data.data;
            this.setState({bookList: list});
            console.log(result.data)
        }, (error) => {

        });
    }

    handleBlockUser() {
        this.setState({showDialogBlock: true})
    }

    handleWarning() {
        alert('warning')
    }


}
const styles = {
    informationContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 30,
        paddingTop: 30,
        paddingLeft: 30,
        paddingBottom: 30,
        paddingRight: 10,
        width: '80%',
        backgroundColor: 'white'
    },
    button: {
        width: '100%',
        backgroundColor: 'rgb(0, 188, 212)'
    },
    buttonLabelStyle: {
        textTransform: 'none',
        margin: 0,
        padding: 10,
        fontFamily: 'Arial',
        color: 'white'
    }

};