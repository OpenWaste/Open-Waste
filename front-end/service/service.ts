import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

export default class Service {

  static async submitImage(resource: any) {
    await instance
        .post('/prediction', resource)
        .then(response => console.log(response))
        .catch(error => console.log(error))
  }
}

