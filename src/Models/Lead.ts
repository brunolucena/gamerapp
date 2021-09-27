export interface LeadModel {
  leadId: string;
  phoneNumber: string;
  manufacturer: string;
  manufacturerId: string;
  motorcycle: string;
  motorcycleId: string;
  zipCode: string;
  password: string;
}

export interface LeadPhoneNumberRequest {
  phoneNumber: string;
}

export interface LeadPhoneNumberResponse {
  registrationLeadId: string;
}

export interface ValidatePhoneNumberRequest {
  leadId: string;
  validationCode: string;
}

export interface ValidatePhoneNumberResponse {}

export interface LeadManufacturerRequest {
  registrationLeadId: string;
  manufacturer: string;
}

export interface LeadManufacturerResponse {
  manufacturer: string;
}

export interface LeadMotorcycleRequest {
  leadId: string;
  motorcycleId: string;
  motorcycle: string;
}

export interface LeadMotorcycleResponse {
  motorcycleId: string;
  motorcycle: string;
  manufacturerId: string;
}

export interface LeadZipCodeRequest {
  leadId: string;
  zipCode: string;
}

export interface LeadZipCodeResponse {
  zipCode: string;
}
