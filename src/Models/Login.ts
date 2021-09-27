import {User} from './User';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  gamerId: string;
  userName: string;
  token: string;
  user: User;
}

export interface LoginErrorResponse {
  success: boolean;
  errors: string[];
}

export interface BaseErrorResponse {
  success: boolean;
  errors: BaseError[] | string[];
}

export interface BaseError {
  key: string;
  message: string;
}

export interface SetProfilePictureRequest {
  gamerId: string;
  imageBase64: string;
}

export interface SetProfilePictureResponse {
  imageUrl: string;
}
