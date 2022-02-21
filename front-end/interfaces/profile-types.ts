import { PredictionResponse } from "./service-types";

export interface LoginFormProperties{
    username: string,
    password: string,
    usernameSetter: (value:string) => void,
    passwordSetter: (value:string) => void,
}