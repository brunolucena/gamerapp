import {UserStore} from './User';

export type StoreType = 'GamerStore' | 'ProStore';

export interface CreateStoreRequest {
  addressDistrict: string;
  addressNumber: string;
  addressStreet: string;
  addressType: string;
  cityId: string;
  complement: string;
  document: string;
  gamerId: string;
  storeName: string;
  /**
   * 1- Gamer Store
   * 2- Pro Store
   */
  storeType: 1 | 2 | number;
  verified: boolean;
  zipCode: string;
}

export interface CreateStoreAddress {
  address: string;
  cityId: string;
  complement: string;
  district: string;
  number: string;
  zipCode: string;
}

export interface CreateStoreResponse extends UserStore {
  experiencePoints: number;
}

export interface RegisterStoreModel {
  address?: string;
  city?: string;
  cityId?: string;
  experiencePoints?: number;
  state?: string;
  complement?: string;
  district?: string;
  document?: string;
  name?: string;
  number?: string;
  type?: string;
  zipCode?: string;
}
