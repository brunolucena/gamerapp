export interface ChatMessage {
  date: Date;
  gamerId: string;
  message: string;
}

export interface GetConversationRequest {
  tradeId: string;
}

export interface GetConvesationResponse {
  messages: ChatMessage[];
  totalPages: number;
  totalItems: number;
}

export interface SendMessageRequest {
  gamerId: string;
  tradeId: string;
  message: string;
}

export interface SendMessageResponse {
  date: Date;
  gamerId: string;
  message: string;
}
