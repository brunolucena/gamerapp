export interface Comment {
  comment: string;
  downvoteCount: number;
  downvoted: boolean;
  gamerName: string;
  imageUrl: string;
  postCommentId: string;
  repliesCount: number;
  upvoteCount: number;
  upvoted: boolean;
}

export interface LoadPostCommentsRequest {
  page: number;
  postId: string;
  replyId?: string;
  searchText: string;
  gamerId: string;
}

export interface LoadPostCommentsResponse {
  count: number;
  comments: Comment[];
}

export interface LoadCommentRepliesRequest {
  postCommentId: string;
  searchText: string;
  page: number;
  gamerId: string;
}

export interface LoadCommentRepliesResponse {
  count: number;
  comments: Comment[];
}

export interface SendCommentRequest {
  gamerId: string;
  postId: string;
  replyId?: string;
  comment?: string;
  imageBase64?: string;
}

export interface SendCommentResponse {
  gamerId: string;
  postCommentId: string;
  postId: string;
  comment: string;
}

export interface CommentReactionRequest {
  gamerId: string;
  postCommentId: string;
  reaction: number; //upvote 1, downvote 0
}

export interface CommentReactionResponse {
  downvoteCount: number;
  downvoted: boolean;
  postCommentId: string;
  upvoteCount: number;
  upvoted: boolean;
}

export interface DeleteCommentRequest {
  postCommentId: string;
  gamerId: string;
}

export interface DeleteCommentResponse {}

export interface SetPostCommentDuckDataRequest {
  activeComment?: Comment;
  refreshing?: boolean;
}
