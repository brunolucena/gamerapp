import {ApiError} from './ReduxModels';

export interface User {
  id: string;
  gamerId: string;
  storeId: string;
  isStore: boolean;
  cpf?: string;
  email: string;
  imageUrl?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  averageRating: number; // 0 a 5
  mainAddressId?: string;
  addresses: Address[];
  wallet?: Wallet;
  gamerRankingPosition?: number;
  rankTitle?: string;
  welcomeGuideDone: boolean;
  store: UserStore;
}

export interface UserStore {
  addressComplement: string;
  addressDistrict: string;
  addressNumber: string;
  addressStreet: string;
  addressType: string;
  averageRating?: number;
  city: string;
  cityId: string;
  corporateName: string;
  dateCreated: Date | string;
  document: string;
  imageUrl: string;
  /** Nome do usuário */
  name: string;
  phoneNumber?: string;
  state: string;
  storeId: string;
  /**
   * 1- Gamer Store
   * 2- Pro Store
   */
  type: number;
  verified: boolean;
  zipCode: string;
}

export interface Address {
  id: string;
  userId: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
  tipo: string; // Ex: casa, trabalho
}

export interface Wallet {
  balance: number;
  cashback: number;
  points: number;
}

export interface GetAddressFromCepRequest {
  zipCode: string;
  redirectTo?: string;
}

export interface GetAddressFromCepResponse {
  address: string;
  city: string;
  cityId: string;
  complement: string;
  district: string;
  state: string;
  zipCode: string;
}

export interface SaveUserAddressRequest {
  address: string;
  cityId: string;
  complement: string;
  district: string;
  gamerId: string;
  number: string;
  zipCode: string;
  type: string;
}

export interface SaveUserAddressResponse {
  address: string;
  addressId: string;
  city: string;
  district: string;
  gamerId: string;
  isCurrent: boolean;
  name: string;
  state: string;
  zipCode: string;
}

export interface ChangeUserMainAddressRequest {
  addressId: string;
  gamerId: string;
}

export interface ChangeUserMainAddressResponse {}

export interface EditProfileRequest {
  documentCpf?: string;
  email?: string;
  fullName?: string;
  gamerId: string;
  phoneNumber?: string;
}

export interface EditProfileResponse {
  documentCpf?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
}

export interface ChangePasswordRequest {
  gamerId: string;
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  id: string;
  userName: string;
  normalizedUserName: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  lockoutEnabled: boolean;
  accessFailedCount: 1;
}

export interface ChangePasswordErrorResponse {
  success: boolean;
  errors: string | ApiError;
}

export interface SetUserAddressDataRequest {
  error?: string;
  loading?: boolean;
  adresses?: Address[];
  addressFromCep?: GetAddressFromCepResponse;
  redirectTo?: string;
}

export interface SetUserDataRequest {
  onboardingDone: boolean;
}
