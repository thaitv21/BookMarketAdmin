import React, {Component} from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    MuiThemeProvider,
    Toggle,
    Dialog,
    FlatButton
} from 'material-ui'

import {
    Jumbotron,
    Form,
    Input,
} from 'reactstrap'

import ToggleButton from 'react-toggle-button'


let data = [
    {
        id: 1,
        email: 'thaitv210@gmail.com',
        phone: '01675801065',
        address: 'Hanoi',
        active: true
    },
    {
        id: 2,
        email: 'thaitv210@gmail.com',
        phone: '01675801065',
        address: 'Hanoi',
        active: false
    },
    {
        id: 3,
        email: 'thaitv210@gmail.com',
        phone: '01675801065',
        address: 'Hanoi',
        active: true
    }
];

export default class UserManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            alertDialog: false,
            selectedItem: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({dataSource: data})
    }

    fillData() {
        return this.state.dataSource.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableRowColumn>{item.id}</TableRowColumn>
                    <TableRowColumn>{item.email}</TableRowColumn>
                    <TableRowColumn style={styles.activeToggle}>
                        <FlatButton
                            label="Xem chi tiết"
                            onClick={() => this.props.history.push('/profile/' + item.id)}
                            labelStyle={{textTransform: 'none', fontFamily: 'Arial'}}/>
                    </TableRowColumn>
                </TableRow>
            )
        })
    }

    // viewUser(user) {
    //     this.props.history.push('/book-detail/' + item.id)}
    // }
    //
    // showAlert(item) {
    //     this.setState({alertDialog: true, selectedItem: item});
    //
    // }
    //
    // cancelBlock() {
    //     this.setState({alertDialog: false})
    // };

    blockUser = () => {
        let dataSource = this.state.dataSource;
        let index = this.state.dataSource ? this.state.dataSource.indexOf(this.state.selectedItem) : -1;
        if (index > -1) {
            dataSource[index].active = !dataSource[index].active;
        }
        this.setState({alertDialog: false, dataSource: dataSource})
    };

    actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => this.cancelBlock(() => {

            })}
        />,
        <FlatButton
            label="OK"
            primary={true}
            onClick={this.blockUser}
        />,
    ];

    render() {

        return (
            <MuiThemeProvider>
                <div style={styles.container}>
                    <Jumbotron>
                        <h2>Quản lý tài khoản người dùng</h2>
                    </Jumbotron>

                    <Form style={{justifyContent: 'center', display: 'flex', margin: 10}}>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Email" style={styles.searchField} />
                        <FlatButton label="Tìm kiếm"/>
                    </Form>

                    <Table style={styles.table}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Email</TableHeaderColumn>
                                <TableHeaderColumn style={styles.activeToggle}>Active</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.fillData()}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    container: {
        paddingLeft: 50,
        paddingRight: 50,
    },
    table: {
        paddingLeft: 50,
        paddingRight: 50
    },
    activeToggle: {
        width: 80,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        defaultToggled: true
    },
    searchField: {
        paddingLeft: 10,
        paddingRight: 10,
        width: '50%',
        marginRight: 10
    }
};