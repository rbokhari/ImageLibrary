import axios from 'axios';
import { SERVER_URI } from '../constant';

const  API_URL = `${SERVER_URI}/api`;

class Api {
    
    static get(url, params = {}) {
        const data = params;
        return axios({
            url: `${API_URL}/${url}`,
            method: 'get',
            //headers: headers,
            params: data
        });
    }

    static post(url, data) {
        const params = Object.assign( {}, data );
        return axios.post(`${API_URL}/${url}`, params);
    }

    // static login(url, data) {
    //     const headers = {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     };
    //     return axios.post(`${API_URL}/${url}`, data);
    // }

    static put(url, data) {
        const params = Object.assign( {}, data );
        return axios.put(`${API_URL}/${url}`, params);
    }

    static upload(url, data) {
        return axios.post(`${API_URL}/${url}`, data);
    }

    static delete(url) {
        return axios.delete(`${API_URL}/${url}`);
    }
}

export default Api;