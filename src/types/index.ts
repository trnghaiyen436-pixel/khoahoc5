export type EnergySource = 
  | 'sun' // Năng lượng Mặt Trời
  | 'wind' // Năng lượng gió
  | 'water' // Năng lượng nước chảy
  | 'food' // Năng lượng từ thức ăn
  | 'fuel' // Năng lượng từ xăng, dầu, than
  | 'electricity'; // Năng lượng điện

export interface EnergyInfo {
  id: EnergySource;
  name: string;
  shortName: string;
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  isRenewable: boolean;
  examples: string[];
}

export interface ActivityCard {
  id: string;
  title: string;
  sgkFigure: '1a' | '1b' | '1c' | '1d' | '1e' | '1g' | '2a' | '2b' | '2c' | '2d';
  sgkLabel: string;
  description: string;
  correctSource: EnergySource;
  explanation: string;
  category: 'human' | 'plant_animal' | 'machine' | 'nature';
  energyEffect: string; // Tác dụng: Giúp lớn lên, chuyển động, phát sáng, tỏa nhiệt...
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  sgkReference: string;
  competency: 'identification' | 'role_analysis' | 'application_saving';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  className: string;
  avatar: string;
  totalScore: number;
  gamesPlayed: number;
  badgesCount: number;
  accuracy: number;
  lastPlayed: string;
  isCurrentUser?: boolean;
}

export interface MiniGameProgress {
  matchSourceScore: number;
  energyLabScore: number;
  speedQuizScore: number;
  ecoSaverScore: number;
  matchSourceCompleted: boolean;
  energyLabCompleted: boolean;
  speedQuizCompleted: boolean;
  ecoSaverCompleted: boolean;
}

export interface ParentReport {
  studentName: string;
  className: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  completedAt: string;
  totalScore: number;
  maxScore: number;
  gradeEvaluation: 'Xuất sắc' | 'Tốt' | 'Đạt yêu cầu' | 'Cần cố gắng';
  competencies: {
    identification: number; // %
    roleAnalysis: number; // %
    energySaving: number; // %
    speedAndFocus: number; // %
  };
  teacherNote: string;
  recommendations: string[];
  badgesEarned: Badge[];
  questionsAnswered: number;
  correctAnswers: number;
}
