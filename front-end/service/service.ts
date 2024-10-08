import axios from 'axios';
import { PredictionResponse, UpdateResponse } from '../interfaces/service-types';
import { UserResource } from '../models/User';
import { save, getValueFor } from '../utils/PersistInfo';
import {AuthenticationResponse} from "../interfaces/profile-types";

const instance = axios.create({
  baseURL: 'https://digiwaste.systems:42069'
});

export default class Service {

  private static async post<T>(endpoint: string, resource: any) {
    return instance.post<T>(`/${endpoint}`, resource)
  }

  static submitImagePrediction(base64Image: string | undefined): Promise<PredictionResponse> {
    return new Promise((resolve, reject) => {
      Service.post('prediction', { image: base64Image })
        .then(a => {
          resolve(a.data)
        })
        .catch(error => {
          reject(error)
        })
    });
  }

  static async submitImageCategory(image: string, category: string):Promise<Object> {
    let resource = {
      category: category,
      image: image
    }
    try {
      let email = await getValueFor('email')
      resource.email = email;
      return Service.post('image-submission', resource)
    }
    catch {
      return Service.post('image-submission', resource)
    }
  }

  static async submitAccountCreation(data: UserResource):Promise<Object> {
    const resource = {
      username: data.username,
      email: data.email,
      password: data.password
    }

    return await Service.post('create-user', resource);
  }

  static authenticateUser(data: UserResource):Promise<AuthenticationResponse> {
    const resource = {
      username: data.username,
      password: data.password
    }

    return new Promise((resolve, reject) => {
      Service.post('authenticate-user', resource)
          .then(a => {
            resolve(a.data)
          })
          .catch(error => {
            reject(error)
          })
    });
  }

  static async changePassword(data: UserResource):Promise<Object> {
    const resource = {
      username: data.username,
      password: data.password
    }

    let resp = await Service.patch('update-password', resource);
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
  
  private static async get<T>(endpoint: string) { 
    return instance.get<T>(`/${endpoint}`)
  }

  /**
   * This function is called on app bootup (from App.tsx) to fetch categories and instructions;
   * This information is then stored locally using expo-secure-storage
   * The data can be retrieved using the getValueFor() function found in PersistInfo.tsx
   */
  static updateApplicationCache(): void {
    this.get<UpdateResponse>('update')
      .then(resp => {
        save("categories", resp.data.categories)
        save("category_instructions", resp.data.category_instructions)
        save("bins", resp.data.bins)
        save("buildings", resp.data.buildings)
      })
  }

  static async getBinImages(bid:number):Promise<Object> {
    let resp = await Service.get(`bin-images/${bid}`)
    return resp
  }

  static async getBuildingImages(bid:number):Promise<Object> {
    let resp = await Service.get(`building-images/${bid}`)
    return resp
  }

  static async resetPassword(data: any):Promise<Object> {
    const resource = {
      email: data.email,
    }

    let resp = await Service.post('reset-password', resource);
    return resp
  }

  static async verifyEmail(data: any):Promise<Object> {
    const resource = {
      passcode: data.passcode,
      email: data.email
    }

    let resp = await Service.post('verify-email', resource);
    return resp
  }
}
