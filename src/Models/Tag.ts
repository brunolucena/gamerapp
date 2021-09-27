export interface TagModel {
  id: string;
  name: string;
  imageUrl: string;
}

export interface LoadTagsRequest {}

export interface LoadTagsResponse {
  tags: TagModel[];
}

export interface SaveGamerTagsRequest {
  gamerId: string;
  tagIds: string[];
}

export interface SaveGamerTagsResponse {}
