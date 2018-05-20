import React, {Component} from 'react'
import {
    MuiThemeProvider,
    RaisedButton
} from 'material-ui'
import axios from 'axios'
import './App.css'

import Image from 'material-ui-image'

let data = {
    id: 2,
    name: 'Thần điêu hiệp lữ',
    year: '2009',
    abstract: 'The auto-complete is an extension of a regular text-field that will auto-complete the input dynamically. It can take different auto-complete filters and uses a menu to display suggestions.',
    price: 500,
    like: 1,
    comment: 10,
    author: {
        id: 1,
        name: 'Than Thai'
    },
    publisher: {
        id: 1,
        name: 'NXB Bách Khoa'
    },
    seller: {
        username: 'thanthai21'
    },
    image: {
        link: 'dsjhds'
    },
    category: {
        name: 'Novel'
    }

};

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
        this.fetchData()
    }

    render() {
        return (
            <MuiThemeProvider>
                <div id="container" style={styles.container}>
                    <div style={styles.content}>
                        <BookImage/>
                        <BookInformation data={this.state.bookDetail}/>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

    fetchData() {
        axios.get('https://raw.githubusercontent.com/ThanThai21/FakeAPI/master/book_market_events.json')
            .then((result) => {
                console.log('result', result);
            })
            .catch((error) => {
                console.log('error', error);
            });
        this.setState({bookDetail: data})
    }
}

class BookImage extends Component {
    render() {
        return (
            <div style={{height: 400, width: 300, backgroundColor: 'red'}}>
                <Image aspectRatio={3 / 4} style={{display: 'flex', alignItems: 'center'}}
                       src="https://scontent.fhph1-2.fna.fbcdn.net/v/t1.0-9/32912993_2702983719750071_7410775845146460160_n.png?_nc_cat=0&oh=f6b5f5fb5a1690b7a998fe8d9495fd9c&oe=5B77DDAA"/>
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
                        <b style={styles.value}>{bookDetail ? bookDetail.price : '0'}</b>
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

    fetchData(id) {

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