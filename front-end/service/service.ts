import axios from 'axios';
import { ImageSubmissionResource } from '../models/ImageSubmission';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

export default class Service {

  private static async post(endpoint: string, resource: any) { 
    await instance
      .post(`/${endpoint}`, resource)
      .then(response => response.data.json())
      .catch(error => console.log(error))
  }
  static async submitImagePrediction(base64Image: string) {
    const resource = new FormData();
    resource.append('image', base64Image);

    this.post('prediction', resource);
  }

  static async submitImageCategory(data: ImageSubmissionResource) {
    const resource = {
      category: data.category,
      image: data.image
    }

    this.post('image-submission', resource)
  }

  private static async get(endpoint: string) { 
    return instance.get(`/${endpoint}`)
  }

  static async getImageCategory() {
    return this.get('update')
  }
}
