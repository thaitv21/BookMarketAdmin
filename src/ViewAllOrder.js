import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import {
    MuiThemeProvider,
    Table,
    TableRowColumn,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableHeader
} from 'material-ui'
import API from './services/API'
export default class ViewAllOrder extends Component {
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
        let params = {user_id: 2}
        API.getAllOrder(params, (result) => {
            console.log('get all order ', result);
            let data = result.data.data;
            this.setState({dataSource: data})
        }, (error) => {
            console.log( 'get all order error', error);
        })
}
    renderItems() {
    
        
                    }
    render(){

            }
}