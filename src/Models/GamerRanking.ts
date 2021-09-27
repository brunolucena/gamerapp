export interface GamerRanking {
  userId: string;
  position: number | null;
  badges: Badge[];
  currentBadge: Badge | null;
  currentTitle: RankingTitle | null;
  titles: RankingTitle[];
}

export interface Badge {
  id: string;
  name: string;
  level: number;
  imagePath: string;
  dateEarned: Date;
}

export interface RankingTitle {
  id: string;
  title: string;
  dateEarned: Date;
}
