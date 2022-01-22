import axios from 'axios';
import { ImageSubmissionResource } from '../models/ImageSubmission';
import { UserResource } from '../models/User';

const instance = axios.create({
  baseURL: 'http://24.203.130.8:55012'
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

  static async submitAccountCreation(data: UserResource) {
    const resource = {
      username: data.username,
      email: data.email,
      password: data.password
    }

    let resp = await this.post('create-user', resource);
    return resp
  }

  static async authenticateUser(data: UserResource) {
    const resource = {
      username: data.username,
      password: data.password
    }

    let resp = await this.post('authenticate-user', resource);
    return resp
  }

  static async changePassword(data: UserResource) {
    const resource = {
      username: data.username,
      password: data.password
    }

    let resp = await this.post('update-password', resource);
    return resp
  }
}
