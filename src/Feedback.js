import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
// Component = React.Component
import {
    MuiThemeProvider,
    Table,
    TableRowColumn,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableHeader,
    FlatButton
} from 'material-ui'

import API from './services/API'
import Admin from './Admin'

export default class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let params = {access_token: Admin.accessToken}
        API.getAllFeedback(params, (result) => {
            console.log('get all feedback', result);
            let data = result.data.data;
            this.setState({dataSource: data})
        }, (error) => {
            console.log(error);
            console.log( 'get all feedback error', error);
        })
        // API.test((result) => {
        //     console.log('search', result);
        // }, (error) => {
        //         console.log('search error', error);
        // });
    }

    renderItems() {
        return this.state.dataSource.map((item, index)=> {
            return(
                <TableRow adjustForCheckbox={false} key={index}>
                    <TableRowColumn>{item.id}</TableRowColumn>
                    <TableRowColumn>{item.sender_id}</TableRowColumn>
                    <TableRowColumn>{item.content}</TableRowColumn>
                    <TableRowColumn>
                        <FlatButton 
                        href ={"http://localhost:3000/book-detail/" + item.book_id}
                        label="Xem sản phẩm"
                        primary={true} />
                    </TableRowColumn>
                    <TableRowColumn>
                        <FlatButton 
                        href ={"http://localhost:3000/profile/" + item.seller_id}
                        label="Xem thông tin" 
                        primary={true} />
                    </TableRowColumn>
                </TableRow>
            )
        })
    }
   

    

    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>STT</TableHeaderColumn>
                                <TableHeaderColumn>Người gửi</TableHeaderColumn>
                                <TableHeaderColumn>Nội dung</TableHeaderColumn>
                                <TableHeaderColumn>Sản phẩm</TableHeaderColumn>
                                <TableHeaderColumn>Người bán</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            { this.state.dataSource &&
                                this.renderItems()
                            }
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        )
    }
}