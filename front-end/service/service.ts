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

  static returnUserInfo(data: UserResource): Promise<Object> {
    const resource = {
      username: data.username,
    }

    let resp = this.post('user', resource);
    return resp
  }

  private static async delete(endpoint: string, configdata: any) {
    return instance.delete(`/${endpoint}`, configdata)
  }

  static deleteUser(data: UserResource): Promise<Object> {
    let resp = this.delete('delete-user', { data: { "username": data.username } });
    return resp
  }

  private static async patch(endpoint: string, data: any) {
    return instance.patch(`/${endpoint}`, data)
  }

  static updateUsernameEmail(data: any): Promise<Object> {

    const userData = {
      old_username: data.old_username,
      new_username: data.new_username,
      email: data.email
    }

    let resp = this.patch('update-username-email', userData);
    return resp
  }
  
  private static async get(endpoint: string) { 
    return instance.get(`/${endpoint}`)
  }

  static getImageCategory(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.get('update')
        .then(a => {
          resolve(a.data)
        })
        .catch(error => {
          reject(error)
        })
    });
  }
}
