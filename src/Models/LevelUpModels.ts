export interface LevelUpRequest {
  gamerId: string;
}

export interface LevelUpResponse {
  achievementRankId: string;
  experiencePointsNeeded: number;
  levelUp: boolean;
  nextRankTitle: string;
  nextRankUrl: string;
  rankImageUrl: string;
  rankTitle: string;
  totalExperiencePoints: number;
}

export interface SetLevelUpDataRequest {
  error?: string;
  loading?: boolean;
  backToRoute?: string;
  achievementRankId?: string;
  experiencePointsNeeded?: number;
  levelUp?: boolean;
  nextRankTitle?: string;
  nextRankUrl?: string;
  rankImageUrl?: string;
  rankTitle?: string;
  totalExperiencePoints?: number;
}
