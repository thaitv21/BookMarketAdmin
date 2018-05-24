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
    };
    instance.get('/get_book', {
        params: params
    }).then((result) => {
        onSuccess(result)
    }).catch((error) => {
        onError(error)
    });
};

const getProfile = (userId, onSuccess, onError) => {
    let params = {
        user_id: userId
    };
    instance.get('/get_profile', {
        params: params
    }).then((result) => {
        onSuccess(result)
    }).catch((error) => {
        onError(error)
    });
};

const getListBook = (params, onSuccess, onError) => {
    instance.get('/get_list_book', {
        params: params
    }).then((result) => {
        onSuccess(result)
    }).catch((error) => {
        onError(error)
    })
};

const search = (p, onSuccess, onError) => {
    instance.get('/search', {
        params: p
    }).then((result) => {
        onSuccess(result);
    }).catch((error) => {
        onError(error);
    })
}
const getAllFeedback = (p, onSuccess, onError) => {
    instance.post('/get_all_feedback', {
        params: p
    }).then((result) => {
        onSuccess(result);
    }).catch((error) => {
        onError(error);
    })
}



const test = (onSuccess, onError) => {
    axios.get('https://raw.githubusercontent.com/ThanThai21/FakeAPI/master/book_market_events.json')
    .then((result) => onSuccess(result))
    .catch((error) => onError(error));
} 

const api = {
    getBookList,
    getBookDetail,
    getProfile,
    getListBook,
    search,
    test,
    getAllFeedback
};

export default api;
