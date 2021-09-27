import {User} from './User';

export interface CreateUserRequest {
  cpf?: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  userType?: string;
}

export interface CreateUserResponse {
  token: string;
  gamerId: string;
  userName: string;
  user: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface SignupModel {
  cpf?: string;
  cpfAlreadyRegistered?: boolean;
  email?: string;
  emailAreadyRegistered?: boolean;
  isCompleted?: boolean;
  isPhoneAlreadyRegistered?: boolean;
  name?: string;
  password?: string;
  passwordCreated?: boolean;
  phoneAuthenticated?: boolean;
  phoneNumber?: string;
  userCreated?: boolean;
  verificationCode?: string;
  verificationCodeSent?: boolean;
  verificationCodeValidated?: boolean;
}

export interface SendVerificationCodeSignupResponse {
  codeSent: boolean;
  isPhoneAlreadyRegistered: boolean;
  message: string;
}

export interface ValidateVerificationCodeResponse {
  success: boolean;
  message: string;
}
