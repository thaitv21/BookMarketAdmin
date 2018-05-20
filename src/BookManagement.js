import React, {Component} from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    MuiThemeProvider,
    RaisedButton,
    TextField,
    FlatButton
} from 'material-ui';

import api from './services/API'

import {
    Jumbotron,
    Form
} from 'reactstrap'

export default class BookManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        api.getBookList((result) => {
            console.log('book list', result.data.data);
            this.setState({dataSource: result.data.data})
        }, (error) => {
            console.log('book list error', error)
        });

    }

    fillData() {
        return this.state.dataSource.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableHeaderColumn style={{width: 40}}>{item.id}</TableHeaderColumn>
                    <TableHeaderColumn>{item.seller.username}</TableHeaderColumn>
                    <TableHeaderColumn>{item.name}</TableHeaderColumn>
                    <TableHeaderColumn>{item.author ? item.author.name : "Không xác định"}</TableHeaderColumn>
                    <TableHeaderColumn>{item.publisher ? item.publisher.name : "Không xác định"}</TableHeaderColumn>
                    <TableHeaderColumn>{item.abstract.length < 20 ? item.abstract : item.abstract.substring(0, 17).concat('...')}</TableHeaderColumn>
                    <TableHeaderColumn>{item.category ? item.category.name : 'Không xác định'}</TableHeaderColumn>
                    <TableHeaderColumn style={{width: 80}}>
                        <FlatButton
                            label="Xem chi tiết"
                            labelStyle={{fontSize: '10px', textTransform: "none", color: 'gray'}}
                            onClick={() => this.props.history.push('/book-detail/' + item.id)}/>
                    </TableHeaderColumn>
                </TableRow>
            )
        })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{
                    paddingLeft: 50,
                    paddingRight: 50
                }}>
                    <Jumbotron>
                        <h2>Quản lý sách</h2>
                    </Jumbotron>

                    <Form style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        padding: 10,
                        backgroundColor: 'white'
                    }}>
                        <TextField placeholder="Từ khóa" style={styles.searchField} underlineShow={false}/>
                        <RaisedButton
                            label="Tìm kiếm"
                            style={styles.buttonStyle}
                            disableTouchRipple={true}
                            overlayStyle={{backgroundColor: 'transparent'}}
                            onClick={this.search.bind(this)}/>
                    </Form>

                    <Table style={styles.table}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width: 40}}>ID</TableHeaderColumn>
                                <TableHeaderColumn>Người bán</TableHeaderColumn>
                                <TableHeaderColumn>Sách</TableHeaderColumn>
                                <TableHeaderColumn>Tác giả</TableHeaderColumn>
                                <TableHeaderColumn>Nhà xuất bản</TableHeaderColumn>
                                <TableHeaderColumn>Tóm tắt</TableHeaderColumn>
                                <TableHeaderColumn>Danh mục</TableHeaderColumn>
                                <TableHeaderColumn style={{width: 80}}></TableHeaderColumn>
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

    search() {

    }
}

const styles = {
    table: {
        paddingLeft: 50,
        paddingRight: 50
    },
    activeToggle: {
        width: 50,
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
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'red',
        border: 'none',
        backgroundColor: '#f5f5f5'
    },
    buttonStyle: {
        paddingTop: 5,
        paddingBottom: 5
    }
};