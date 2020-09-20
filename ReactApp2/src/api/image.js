import Api from 'api/api';

const url = 'image';
export default class ImageApi {

    static getAll(params) {
        return Api.get(`${url}`, params);
    }

    static getSingle(id) {
        return Api.get(`${url}/${id}`);
    }

    static upload(data) {
        console.info('fiel upload', data);
        const headers = {
            //'authorization': localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data; charset=utf-8',
            //'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Origin, Content-Type, Content-Range, Content-Disposition, Content-Description'
        };
        return Api.upload(url, data, { headers: headers });
    }
    
    static delete(fileName) {
        return Api.delete(`${url}/${fileName}`);
    }
    
};