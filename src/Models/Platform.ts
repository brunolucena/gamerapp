export interface Platform {
  id: string;
  name: string;
  description?: string;
}


export interface PlatformWithImage {
  id: string;
  name: string;
  imageUrl: string;
}

export interface LoadPlatformsRequest {
}

export interface LoadPlatformsResponse {
  platforms: PlatformWithImage[];
}

export interface SavePlatformsRequest {
  gamerId: string;
  platformIds: string[];
}

export interface SavePlatformsResponse {
  
}