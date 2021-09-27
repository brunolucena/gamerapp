import {TagModel} from './Tag';

export interface FeedModel {
  commentCount: number;
  content: string;
  dateCreated: Date | string;
  downvoteCount: number;
  downvoted: boolean;
  gamerId: string;
  gamerName: string;
  imageUrl: string;
  keywords: string[];
  postId: string;
  shareCount: number;
  tagId: string;
  tagName: string;
  tagUrl: string;
  type: FeedType;
  upvoteCount: number;
  upvoted: boolean;
}

export type FeedType =
  | 'Imagem'
  | 'Video'
  | 'Review'
  | 'Coleção'
  | 'Wishlist'
  | 'Trade'
  | 'LevelUp';

export interface FeedVideoImageModel {
  Title: string;
  Url: string;
}

export interface FeedReviewModel {
  title: string;
  observation: string;
  imageUrl: string;
  pros: string;
  cons: string;
  categories: FeedReviewRatingModel[];
}

export interface FeedReviewRatingModel {
  name: string;
  rating: number;
}

export interface FeedTradeModel extends TitleImageModel {}

export interface FeedCollectionWishlistModel extends TitleImageModel {}

interface TitleImageModel {
  title: string;
  description: string;
  images: string[];
}

// requests responses

export interface FilterPostRequest {
  gamerId: string;
  page: number;
  searchText: string;
  tagIds: string[];
}

export interface FilterPostResponse {
  count: number;
  posts: FeedModel[];
}

export interface PostReactionRequest {
  gamerId: string;
  postId: string;
  reaction: number; //upvote 1, downvote 0
}

export interface PostReactionResponse {
  commentCount: number;
  downvoteCount: number;
  downvoted: boolean;
  postId: string;
  shareCount: number;
  upvoteCount: number;
  upvoted: boolean;
}

export interface SetFeedDataRequest {
  refreshing?: boolean;
  selectedPost?: FeedModel;
  selectedTags?: TagModel[];
}

export interface DeletePostRequest {
  postId: string;
}

export interface DeletePostResponse {
  postId: string;
}
