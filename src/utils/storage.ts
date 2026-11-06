import { Badge, LeaderboardEntry, MiniGameProgress, ParentReport } from '../types';
import { INITIAL_BADGES, INITIAL_LEADERBOARD } from '../data/energyLessonData';

const STORAGE_KEYS = {
  STUDENT_NAME: 'energy_app_student_name',
  STUDENT_CLASS: 'energy_app_student_class',
  STUDENT_AVATAR: 'energy_app_student_avatar',
  PARENT_NAME: 'energy_app_parent_name',
  PARENT_PHONE: 'energy_app_parent_phone',
  PARENT_EMAIL: 'energy_app_parent_email',
  PROGRESS: 'energy_app_progress',
  BADGES: 'energy_app_badges',
  LEADERBOARD: 'energy_app_leaderboard',
  PLAY_COUNT: 'energy_app_play_count',
  COMPETENCY_STATS: 'energy_app_competency_stats'
};

export interface CompetencyStats {
  identificationCorrect: number;
  identificationTotal: number;
  roleAnalysisCorrect: number;
  roleAnalysisTotal: number;
  energySavingCorrect: number;
  energySavingTotal: number;
  speedStreakMax: number;
}

export function getStudentProfile() {
  if (typeof window === 'undefined') {
    return { name: 'Em Học Sinh', className: '5A1', avatar: '🚀', parentName: 'Phụ huynh', parentPhone: '0988123456', parentEmail: 'phuhuynh@example.com' };
  }
  return {
    name: localStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || 'Nguyễn Tuấn Kiệt',
    className: localStorage.getItem(STORAGE_KEYS.STUDENT_CLASS) || '5A1',
    avatar: localStorage.getItem(STORAGE_KEYS.STUDENT_AVATAR) || '🚀',
    parentName: localStorage.getItem(STORAGE_KEYS.PARENT_NAME) || 'Bố Mẹ Tuấn Kiệt',
    parentPhone: localStorage.getItem(STORAGE_KEYS.PARENT_PHONE) || '0912 345 678',
    parentEmail: localStorage.getItem(STORAGE_KEYS.PARENT_EMAIL) || 'trnghaiyen436@gmail.com'
  };
}

export function saveStudentProfile(profile: { name: string; className: string; avatar: string; parentName?: string; parentPhone?: string; parentEmail?: string }) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, profile.name);
  localStorage.setItem(STORAGE_KEYS.STUDENT_CLASS, profile.className);
  localStorage.setItem(STORAGE_KEYS.STUDENT_AVATAR, profile.avatar);
  if (profile.parentName) localStorage.setItem(STORAGE_KEYS.PARENT_NAME, profile.parentName);
  if (profile.parentPhone) localStorage.setItem(STORAGE_KEYS.PARENT_PHONE, profile.parentPhone);
  if (profile.parentEmail) localStorage.setItem(STORAGE_KEYS.PARENT_EMAIL, profile.parentEmail);
}

export function getMiniGameProgress(): MiniGameProgress {
  if (typeof window === 'undefined') {
    return {
      matchSourceScore: 0,
      energyLabScore: 0,
      speedQuizScore: 0,
      ecoSaverScore: 0,
      matchSourceCompleted: false,
      energyLabCompleted: false,
      speedQuizCompleted: false,
      ecoSaverCompleted: false
    };
  }
  const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return {
    matchSourceScore: 0,
    energyLabScore: 0,
    speedQuizScore: 0,
    ecoSaverScore: 0,
    matchSourceCompleted: false,
    energyLabCompleted: false,
    speedQuizCompleted: false,
    ecoSaverCompleted: false
  };
}

export function saveMiniGameProgress(progress: MiniGameProgress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
}

export function getBadges(): Badge[] {
  if (typeof window === 'undefined') return INITIAL_BADGES;
  const saved = localStorage.getItem(STORAGE_KEYS.BADGES);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return INITIAL_BADGES;
}

export function unlockBadge(badgeId: string): Badge[] {
  const currentBadges = getBadges();
  const updated = currentBadges.map(b => {
    if (b.id === badgeId && !b.isUnlocked) {
      return { ...b, isUnlocked: true, unlockedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) };
    }
    return b;
  });
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(updated));
  }
  return updated;
}

export function getPlayCount(): number {
  if (typeof window === 'undefined') return 1;
  const count = parseInt(localStorage.getItem(STORAGE_KEYS.PLAY_COUNT) || '1', 10);
  return isNaN(count) ? 1 : count;
}

export function incrementPlayCount(): number {
  const current = getPlayCount();
  const next = current + 1;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PLAY_COUNT, next.toString());
  }
  return next;
}

export function getCompetencyStats(): CompetencyStats {
  if (typeof window === 'undefined') {
    return {
      identificationCorrect: 4,
      identificationTotal: 5,
      roleAnalysisCorrect: 4,
      roleAnalysisTotal: 4,
      energySavingCorrect: 3,
      energySavingTotal: 3,
      speedStreakMax: 4
    };
  }
  const saved = localStorage.getItem(STORAGE_KEYS.COMPETENCY_STATS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return {
    identificationCorrect: 0,
    identificationTotal: 0,
    roleAnalysisCorrect: 0,
    roleAnalysisTotal: 0,
    energySavingCorrect: 0,
    energySavingTotal: 0,
    speedStreakMax: 0
  };
}

export function recordCompetencyAnswer(competency: 'identification' | 'role_analysis' | 'application_saving', isCorrect: boolean, currentStreak?: number) {
  const stats = getCompetencyStats();
  if (competency === 'identification') {
    stats.identificationTotal += 1;
    if (isCorrect) stats.identificationCorrect += 1;
  } else if (competency === 'role_analysis') {
    stats.roleAnalysisTotal += 1;
    if (isCorrect) stats.roleAnalysisCorrect += 1;
  } else {
    stats.energySavingTotal += 1;
    if (isCorrect) stats.energySavingCorrect += 1;
  }
  if (currentStreak && currentStreak > stats.speedStreakMax) {
    stats.speedStreakMax = currentStreak;
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.COMPETENCY_STATS, JSON.stringify(stats));
  }
}

export function getLeaderboard(currentStudentScore: number, currentStudentBadgesCount: number): LeaderboardEntry[] {
  let list = INITIAL_LEADERBOARD;
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch {}
    }
  }

  const profile = getStudentProfile();
  const currentUserEntry: LeaderboardEntry = {
    id: 'user-current',
    studentName: profile.name,
    className: profile.className,
    avatar: profile.avatar,
    totalScore: currentStudentScore,
    gamesPlayed: getPlayCount(),
    badgesCount: currentStudentBadgesCount,
    accuracy: Math.min(100, Math.max(75, Math.round((currentStudentScore / 1400) * 100) || 85)),
    lastPlayed: 'Vừa xong',
    isCurrentUser: true
  };

  // Combine and sort by score descending
  const others = list.filter(item => item.id !== 'user-current');
  const allEntries = [...others, currentUserEntry].sort((a, b) => b.totalScore - a.totalScore);

  return allEntries;
}

export function generateParentReport(progress: MiniGameProgress, badges: Badge[]): ParentReport {
  const profile = getStudentProfile();
  const totalScore = progress.matchSourceScore + progress.energyLabScore + progress.speedQuizScore + progress.ecoSaverScore;
  const maxScore = 1500;
  const scorePercent = Math.min(100, Math.round((totalScore / maxScore) * 100));

  let gradeEvaluation: 'Xuất sắc' | 'Tốt' | 'Đạt yêu cầu' | 'Cần cố gắng' = 'Cần cố gắng';
  if (scorePercent >= 85) gradeEvaluation = 'Xuất sắc';
  else if (scorePercent >= 70) gradeEvaluation = 'Tốt';
  else if (scorePercent >= 50) gradeEvaluation = 'Đạt yêu cầu';

  const stats = getCompetencyStats();

  const idenPct = stats.identificationTotal > 0
    ? Math.round((stats.identificationCorrect / stats.identificationTotal) * 100)
    : Math.min(100, Math.round((progress.matchSourceScore / 300) * 100) || 85);

  const rolePct = stats.roleAnalysisTotal > 0
    ? Math.round((stats.roleAnalysisCorrect / stats.roleAnalysisTotal) * 100)
    : Math.min(100, Math.round((progress.energyLabScore / 400) * 100) || 90);

  const ecoPct = stats.energySavingTotal > 0
    ? Math.round((stats.energySavingCorrect / stats.energySavingTotal) * 100)
    : Math.min(100, Math.round((progress.ecoSaverScore / 300) * 100) || 80);

  const speedPct = Math.min(100, Math.round((progress.speedQuizScore / 500) * 100) || 80);

  const earnedBadges = badges.filter(b => b.isUnlocked);

  let teacherNote = '';
  const recommendations: string[] = [];

  if (gradeEvaluation === 'Xuất sắc') {
    teacherNote = `Khen ngợi em ${profile.name}! Em đã thể hiện sự hiểu biết sâu sắc và toàn diện về bài học "Vai trò của năng lượng" (Khoa học 5). Em phân biệt rành rọt các nguồn năng lượng trong tự nhiên (Mặt Trời, gió, nước) cũng như năng lượng từ thức ăn và nhiên liệu nhân tạo. Đặc biệt, em có ý thức bảo vệ môi trường và tiết kiệm năng lượng rất đáng khen!`;
    recommendations.push('Tiếp tục phát huy tinh thần tự giác học tập và yêu thích khám phá khoa học.');
    recommendations.push('Khuyến khích con chia sẻ các mẹo tiết kiệm điện trong gia đình cho ông bà, cha mẹ cùng thực hiện.');
    recommendations.push('Đọc thêm các sách mở rộng về năng lượng tái tạo và năng lượng xanh.');
  } else if (gradeEvaluation === 'Tốt') {
    teacherNote = `Em ${profile.name} đã hoàn thành tốt bài ôn tập. Em nắm vững các khái niệm cơ bản về nguồn năng lượng và vai trò của năng lượng đối với con người, thực vật và máy móc. Cần chú ý thêm một số câu hỏi tình huống về năng lượng tái tạo để đạt kết quả xuất sắc hơn.`;
    recommendations.push('Bố mẹ cùng con quan sát các thiết bị điện trong nhà (nồi cơm điện, quạt, bình nước nóng) và hỏi con về nguồn năng lượng vận hành.');
    recommendations.push('Tập cho con thói quen tắt đèn học và thiết bị điện ngay khi ra khỏi phòng.');
    recommendations.push('Chơi lại Mini-game 3 để rèn luyện thêm phản xạ tốc độ trả lời câu hỏi trắc nghiệm.');
  } else {
    teacherNote = `Em ${profile.name} đã rất cố gắng tham gia ôn tập. Em đã nhận biết được một số nguồn năng lượng quen thuộc như năng lượng thức ăn và năng lượng điện. Tuy nhiên em cần rà soát lại các hình ảnh trong sách giáo khoa (Hình 1 và Hình 2) để hiểu rõ hơn về năng lượng gió, nước chảy và nhiên liệu.`;
    recommendations.push('Bố mẹ dành 10 - 15 phút cùng con mở sách giáo khoa trang Bài 7 và xem lại các hình minh họa.');
    recommendations.push('Cho con làm lại Mini-game 1 (Ghép cặp SGK) với sự trợ giúp nhẹ nhàng của phụ huynh.');
    recommendations.push('Động viên, khích lệ tinh thần để con không nản lòng.');
  }

  return {
    studentName: profile.name,
    className: profile.className,
    parentName: profile.parentName,
    parentPhone: profile.parentPhone,
    parentEmail: profile.parentEmail,
    completedAt: new Date().toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    totalScore,
    maxScore,
    gradeEvaluation,
    competencies: {
      identification: Math.max(30, idenPct),
      roleAnalysis: Math.max(35, rolePct),
      energySaving: Math.max(40, ecoPct),
      speedAndFocus: Math.max(30, speedPct)
    },
    teacherNote,
    recommendations,
    badgesEarned: earnedBadges,
    questionsAnswered: stats.identificationTotal + stats.roleAnalysisTotal + stats.energySavingTotal || 15,
    correctAnswers: stats.identificationCorrect + stats.roleAnalysisCorrect + stats.energySavingCorrect || 12
  };
}
