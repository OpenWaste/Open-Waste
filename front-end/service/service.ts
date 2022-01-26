import axios from 'axios';
import { ImageSubmissionResource } from '../models/ImageSubmission';

const instance = axios.create({
  baseURL: 'https://digiwaste.systems:42069'
});

export default class Service {

  private static async post(endpoint: string, resource: any) {
    return instance.post(`/${endpoint}`, resource)
  }

  static submitImagePrediction(base64Image: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.post('prediction', { image: base64Image })
        .then(a => {
          resolve(a.data)
        })
        .catch(error => {
          reject(error)
        })
    });
  }

  static async submitImageCategory(data: ImageSubmissionResource) {
    const resource = {
      category: data.category,
      image: data.image
    }

    let resp = await this.post('image-submission', resource);
    return resp
  }
}
