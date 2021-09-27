export interface CheckNextAchievementRequest {
  gamerId: string;
}

export interface NextAchievement {
  rankTitle: string;
  totalExperiencePoints: string;
  rankImageUrl: string;
  levelUp: boolean;
}

export interface AchievementsHistory {
  gamerAchievementRankId: string;
  achievementRankId: string;
  isCurrentRank: boolean;
  rankTitle: string;
  rankImageUrl: string;
  date: Date;
}

export interface GamerRankingItem {
  gamerId: string;
  imageUrl: string;
  name: string;
  experiencePoints: number;
  position: number;
  rankTitle: string;
}

export interface GamerRanking {
  averageRating: number;
  city: string;
  distance: number;
  experiencePoints: number;
  gamerId: string;
  imageUrl: string;
  name: string;
  negotiationsCount: number;
  nextLevelRank: string;
  nextLevelTotalExperiencePoints: number;
  position: number;
  rankTitle: string;
  state: string;
  tradesFinishedCount: number;
}

export interface GetGamerRankingListRequest {
  gamerId: string;
  page: number;
}

export interface GetGamerRankingListResponse {
  rankings: GamerRankingItem[];
  me: GamerRankingItem;
}

export interface GetGamerRankingRequest {
  gamerId: string;
  myGamerId: string;
}

export interface GetGamerRankingResponse {
  gamerId: string;
  averageRating: number;
  imageUrl: string;
  name: string;
  experiencePoints: number;
  nextLevelTotalExperiencePoints: number;
  nextLevelRank: string;
  position: number;
  rankTitle: string;
  negotiationsCount: number;
  tradesFinishedCount: number;
  city: string;
  state: string;
  distance: number;
}

export interface GamerPointsHistory {
  gainedExperiencePoints: number;
  date: Date;
  description: string;
}

export interface GetAchievementDataRequest {
  gamerId: string;
}

export interface AchievementsHistoryResponse {
  gamerAchievements: AchievementsHistory[];
}

export interface GamerPointsHistoryResponse {
  gamerPointsHistory: GamerPointsHistory[];
}
