import React, {Component} from 'react'
import {
    MuiThemeProvider,
    RaisedButton,
    CircularProgress
} from 'material-ui'
import './App.css'
import API from './services/API'

import Image from 'material-ui-image'


export default class BookDetail extends Component {

    constructor(props) {
        super(props);
        console.log('BookInformation', props);
        this.state = {
            bookDetail: null,
            bookId: props.match.params.bookId
        }
    }

    componentDidMount() {
        this.fetchData(this.state.bookId);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div id="container" style={styles.container}>
                    {!this.state.bookDetail && <CircularProgress style={{marginTop: 50}} size={60} thickness={7}/>}
                    {this.state.bookDetail && (
                        <div style={styles.content}>
                            <BookImage url={this.state.bookDetail.image[0].link}/>
                            <BookInformation data={this.state.bookDetail}/>
                        </div>
                    )}
                </div>
            </MuiThemeProvider>
        )
    }

    fetchData(id) {
        API.getBookDetail(id, (result) => {
            console.log('book detail', result.data);
            this.setState({bookDetail: result.data.data})
        }, (error) => {
            console.log('book detail error', error);
        });
    }
}

class BookImage extends Component {
    render() {
        let url = this.props.url || "";
        return (
            <div style={{height: 400, width: 300, backgroundColor: 'red'}}>
                <Image aspectRatio={3 / 4} style={{display: 'flex', alignItems: 'center'}}
                       src={url}/>
            </div>
        )
    }
}

class BookInformation extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const bookDetail = this.props.data;
        return (
            <div style={styles.bookInformationContainer}>
                <h2>{bookDetail ? bookDetail.name : 'Book title'}</h2>
                <ul style={styles.table}>
                    <li style={styles.row}>
                        <span style={styles.label}>Tác giả: </span>
                        <b style={styles.value}>{bookDetail ? bookDetail.author.name : 'Chưa xác định'}</b>
                    </li>
                    <li style={styles.row}>
                        <span style={styles.label}>Nhà xuất bản: </span>
                        <b style={styles.value}>{bookDetail ? bookDetail.publisher.name : 'Chưa xác định'}</b>
                    </li>
                    <li style={styles.row}>
                        <span style={styles.label}>Danh mục: </span>
                        <b style={styles.value}>{bookDetail ? bookDetail.category.name : 'Chưa xác định'}</b>
                    </li>
                    <li style={styles.row}>
                        <span style={styles.label}>Năm xuất bản: </span>
                        <b style={styles.value}>{bookDetail ? bookDetail.year : 'Chưa xác định'}</b>
                    </li>
                    <li style={styles.row}>
                        <span style={styles.label}>Giá: </span>
                        <b style={styles.value}>{bookDetail ? bookDetail.price : '0'}.000 VNĐ</b>
                    </li>
                    <li style={styles.row}>
                        <span style={styles.label}>Người bán: </span>
                        <b style={styles.value}>{bookDetail ? bookDetail.seller.username : 'Book title'}</b>
                    </li>
                </ul>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: 50}}>
                    <RaisedButton label="Yêu cầu thay đổi thông tin"
                                  labelStyle={{fontFamily: 'Arial', textTransform: 'none'}}/>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 40,
        backgroundColor: 'white',
        marginLeft: 100,
        marginRight: 100
    },
    bookInformationContainer: {
        marginLeft: 20,
        marginRight: 20
    },
    table: {
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        paddingLeft: 0,
        width: 400
    },
    row: {
        display: 'table',
        width: '100%',
        padding: 5,
        textAlign: 'left'
    },
    label: {
        display: 'table-cell',
        width: '50%',
        verticalAlign: 'top',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        color: '#666'
    },
    value: {
        display: 'table-cell',
        width: 'auto',
        verticalAlign: 'top',
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        fontSize: 14,
        color: '#333'

    }
};