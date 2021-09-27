export interface Motorcycle {
  id: string;
  name: string;
  manufacturerName: string;
  manufacturerId: string;
}

export interface MotorcycleRequest {
  manufacturerId: string;
}

export interface MotorcycleResponse {
  id: string;
  name: string;
  manufacturerName: string;
  manufacturerId: string;
}
