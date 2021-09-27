import {TagModel} from 'src/Models/Tag';

export type PostType = 'Image' | 'Link' | 'Review' | 'Question';

export interface SetPostDuckDataRequest {
  newPostImage?: string;
  newPostKeywords?: string[];
  newPostTags?: TagModel[];
  newPostType?: PostType;
  title?: string;
}

export interface NewPostRequest {
  contentUrl: string;
  gamerId: string;
  imageBase64: string;
  keyWords: string[];
  /**
   * (1, "Imagem") - Image
   * (2, "Video") - VideoUrl
   * (3, "Review") - Review
   * (4, "Coleção") - Collection
   * (5, "Wishlist") - Wishlist
   * (6, "Trade") - TradeRequest
   * (7, "LevelUp") - LevelUp
   */
  postTypeEnum: number;
  tagIds: string[];
  title: string;
  /**
   * (1, "Imagem") - Image
   * (2, "Video") - VideoUrl
   * (3, "Review") - Review
   * (4, "Coleção") - Collection
   * (5, "Wishlist") - Wishlist
   * (6, "Trade") - TradeRequest
   * (7, "LevelUp") - LevelUp
   */
  type: number;
}
export interface NewPostResponse {}
