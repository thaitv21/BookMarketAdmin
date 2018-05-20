import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://book-market-app.herokuapp.com',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar', "Access-Control-Allow-Origin": "*"}
});

const getBookList = (onSuccess, onError) => {
    let params = {
        count: 10,
        index: 0
    };
    instance.get('/get_list_book', {
        params: params
    }).then((result) => {
        onSuccess(result)
    }).catch((error) => {
        onError(error)
    });
};

const getBookDetail = (bookId, onSuccess, onError) => {
    let params = {
        book_id: bookId
    }
    instance.get('/get_list_book', {
        params: params
    }).then((result) => {
        onSuccess(result)
    }).catch((error) => {
        onError(error)
    });
};

const api = {
    getBookList
};

export default api;
