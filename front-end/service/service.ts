import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

export default class Service {

  static async submitImagePrediction(base64Image: string) {
    let data = new FormData()
    data.append('image', base64Image)
    await instance
        .post('/prediction', data)
        .then(response => console.log(response))
        .catch(error => console.log(error))
  }
}