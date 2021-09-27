export interface CustomerResponse {
  customerId: string;
  name: string;
  motorcycle: string;
  motorcycleId: string;
  manufacturer: string;
  manufacturerId: string;
  token: string;
}

export interface CustomerRequest {
  leadId: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  motorcycleId: string;
  zipCode: string;
}

export interface CustomerModel {
  customerId: string;
  name: string;
  zipCode: string;
  email: string;
  motorcycle: string;
  motorcycleId: string;
  manufacturer: string;
  manufacturerId: string;
  token: string;
}

export interface CustomerMotorcycleModel {
  name: string;
  customerId: string;
  motorcycle: string;
  motorcycleId: string;
  manufacturer: string;
  manufacturerId: string;
  plate: string;
}

export interface CustomerMotorcycleRequest {
  customerId: string;
}

export interface CustomerMotorcycleResponse {
  motorcycles: CustomerMotorcycleModel[];
}
