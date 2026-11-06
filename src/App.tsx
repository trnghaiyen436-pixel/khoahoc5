import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Award, 
  FileSpreadsheet, 
  BookOpen, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Zap, 
  BatteryCharging, 
  Leaf, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { SGKViewerModal } from './components/SGKViewerModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { ParentReportModal } from './components/ParentReportModal';
import { LeaderboardView } from './components/LeaderboardView';
import { BadgeCollectionModal } from './components/BadgeCollectionModal';
import { MatchSourceGame } from './components/minigames/MatchSourceGame';
import { EnergyLabGame } from './components/minigames/EnergyLabGame';
import { SpeedQuizGame } from './components/minigames/SpeedQuizGame';
import { EcoSaverGame } from './components/minigames/EcoSaverGame';
import { 
  getStudentProfile, 
  getMiniGameProgress, 
  saveMiniGameProgress, 
  getBadges, 
  unlockBadge, 
  generateParentReport, 
  incrementPlayCount 
} from './utils/storage';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('lobby');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSGKOpen, setIsSGKOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [student, setStudent] = useState(getStudentProfile());
  const [progress, setProgress] = useState(getMiniGameProgress());
  const [badges, setBadges] = useState(getBadges());

  // Reload profile when updated
  const refreshProfile = () => {
    setStudent(getStudentProfile());
  };

  const handleToggleMute = () => {
    sounds.isMuted = !sounds.isMuted;
    setIsMuted(sounds.isMuted);
  };

  const totalScore = progress.matchSourceScore + progress.energyLabScore + progress.speedQuizScore + progress.ecoSaverScore;
  const unlockedBadgesCount = badges.filter(b => b.isUnlocked).length;
  const completedGamesCount = [
    progress.matchSourceCompleted,
    progress.energyLabCompleted,
    progress.speedQuizCompleted,
    progress.ecoSaverCompleted
  ].filter(Boolean).length;

  // Check and unlock grand badges
  useEffect(() => {
    if (totalScore >= 1000) {
      setBadges(unlockBadge('badge-grand-master'));
    }
  }, [totalScore]);

  // Mini-game completion handlers
  const handleGame1Complete = (score: number) => {
    const updated = {
      ...progress,
      matchSourceScore: Math.max(progress.matchSourceScore, score),
      matchSourceCompleted: true
    };
    setProgress(updated);
    saveMiniGameProgress(updated);
    setBadges(unlockBadge('badge-sgk-master'));
    incrementPlayCount();
  };

  const handleGame2Complete = (score: number) => {
    const updated = {
      ...progress,
      energyLabScore: Math.max(progress.energyLabScore, score),
      energyLabCompleted: true
    };
    setProgress(updated);
    saveMiniGameProgress(updated);
    setBadges(unlockBadge('badge-lab-engineer'));
    incrementPlayCount();
  };

  const handleGame3Complete = (score: number, maxStreak: number) => {
    const updated = {
      ...progress,
      speedQuizScore: Math.max(progress.speedQuizScore, score),
      speedQuizCompleted: true
    };
    setProgress(updated);
    saveMiniGameProgress(updated);
    if (maxStreak >= 5) {
      setBadges(unlockBadge('badge-speed-genius'));
    }
    incrementPlayCount();
  };

  const handleGame4Complete = (score: number) => {
    const updated = {
      ...progress,
      ecoSaverScore: Math.max(progress.ecoSaverScore, score),
      ecoSaverCompleted: true
    };
    setProgress(updated);
    saveMiniGameProgress(updated);
    setBadges(unlockBadge('badge-green-warrior'));
    incrementPlayCount();
  };

  const parentReport = generateParentReport(progress, badges);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSGK={() => setIsSGKOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        totalScore={totalScore}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'lobby' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            
            {/* Hero Welcome & Learning Motivation */}
            <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white p-6 sm:p-10 shadow-md overflow-hidden">
              {/* Subtle visual decoration */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{student.avatar}</span>
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-100">
                    Chào mừng bạn {student.name} · Lớp {student.className}
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                  Đấu Trường Năng Lượng - Khoa Học Lớp 5
                </h1>

                <p className="text-xs sm:text-base text-amber-50 leading-relaxed max-w-2xl">
                  Khám phá Bài 7: <strong className="text-white">Vai trò của năng lượng</strong> (SGK Kết nối tri thức). Cùng vượt qua 4 mini-game thử thách, chinh phục huy hiệu vinh dự và gửi bảng điểm xuất sắc về cho bố mẹ nhé!
                </p>

                {/* Quick actions inside hero */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setCurrentTab('game1');
                    }}
                    className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-slate-900" />
                    <span>Bắt Đầu Ôn Bài Ngay</span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setIsSGKOpen(true);
                    }}
                    className="px-4 py-2.5 bg-amber-700/50 hover:bg-amber-700/70 text-white rounded-xl font-semibold text-xs sm:text-sm backdrop-blur-xs transition-colors flex items-center gap-2 cursor-pointer border border-amber-300/30"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Xem Trang Sách Gốc</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick KPI / Overview Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold">Điểm Tích Lũy</span>
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                  {totalScore.toLocaleString('vi-VN')}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">mục tiêu 1,500 đ</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold">Nhiệm Vụ Ôn Tập</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                  {completedGamesCount} / 4
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">mini-game hoàn thành</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold">Huy Hiệu Đạt Được</span>
                  <Award className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                  {unlockedBadgesCount} / {badges.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">bộ sưu tập khoa học</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold">Báo Cáo Phụ Huynh</span>
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {totalScore > 0 ? (
                    <span className="text-emerald-600 font-bold">Đã sẵn sàng gửi</span>
                  ) : (
                    <span className="text-slate-400">Chưa có kết quả</span>
                  )}
                </div>
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 cursor-pointer block mt-1"
                >
                  Xem phiếu đánh giá &rarr;
                </button>
              </div>
            </div>

            {/* 4 Mini Games Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                    4 Mini Game Ôn Tập Sinh Động
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Bám sát hình 1, hình 2 SGK và ứng dụng năng lượng trong đời sống hàng ngày
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Game 1: Match Source */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl border border-amber-200">
                        📖
                      </div>
                      {progress.matchSourceCompleted ? (
                        <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã hoàn thành
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">10 Thử thách SGK</span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                      Mini-game 1: Ghép Cặp Nguồn Năng Lượng
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      Quan sát kỹ các hoạt động trong Hình 1 và Hình 2 SGK (cây lớn lên, xe máy chạy, trâu ăn cỏ, chong chóng, nồi cơm điện...) và ghép với nguồn năng lượng tương ứng.
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                      <span>Phần thưởng: <strong className="text-amber-600 font-mono font-bold">+300 đ</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Huy hiệu: <strong className="text-slate-700 font-medium">Thám Tử SGK</strong></span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      Điểm: {progress.matchSourceScore} đ
                    </span>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setCurrentTab('game1');
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <span>{progress.matchSourceCompleted ? 'Chơi Lại' : 'Chơi Ngay'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Game 2: Energy Lab */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl border border-blue-200">
                        ⚡
                      </div>
                      {progress.energyLabCompleted ? (
                        <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã hoàn thành
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">8 Trạm tiếp sức</span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      Mini-game 2: Tiếp Sức Cho Người & Máy Móc
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      Phòng thí nghiệm tương tác: Nạp đúng bình năng lượng (thức ăn, xăng dầu, điện, gió, mặt trời) để nạp đầy pin 100% cho người chạy bộ, tàu hỏa, hoa nở, đèn sáng.
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                      <span>Phần thưởng: <strong className="text-amber-600 font-mono font-bold">+400 đ</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Huy hiệu: <strong className="text-slate-700 font-medium">Kỹ Sư Tiếp Sức</strong></span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      Điểm: {progress.energyLabScore} đ
                    </span>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setCurrentTab('game2');
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <span>{progress.energyLabCompleted ? 'Chơi Lại' : 'Chơi Ngay'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Game 3: Speed Quiz */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-2xl border border-orange-200">
                        ⏱️
                      </div>
                      {progress.speedQuizCompleted ? (
                        <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã hoàn thành
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">10 Câu đố tính giờ</span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors">
                      Mini-game 3: Đấu Trí Năng Lượng Siêu Tốc
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      Đồng hồ đếm ngược 15 giây mỗi câu hỏi, chuỗi Combo Streak nhân đôi điểm số cho câu trả lời chính xác liên tiếp. Giải thích kiến thức cặn kẽ sau từng câu!
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                      <span>Phần thưởng: <strong className="text-amber-600 font-mono font-bold">+500 đ</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Huy hiệu: <strong className="text-slate-700 font-medium">Thần Tốc Khoa Học</strong></span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      Điểm: {progress.speedQuizScore} đ
                    </span>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setCurrentTab('game3');
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <span>{progress.speedQuizCompleted ? 'Chơi Lại' : 'Chơi Ngay'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Game 4: Eco Saver */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl border border-emerald-200">
                        🌱
                      </div>
                      {progress.ecoSaverCompleted ? (
                        <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã hoàn thành
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">12 Thử thách xanh</span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Mini-game 4: Vệ Sĩ Năng Lượng Xanh
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      Phân loại năng lượng tái tạo vs không tái tạo, giải quyết tình huống sử dụng điện tiết kiệm, phòng chống lãng phí và bảo vệ môi trường trong gia đình.
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                      <span>Phần thưởng: <strong className="text-amber-600 font-mono font-bold">+300 đ</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Huy hiệu: <strong className="text-slate-700 font-medium">Chiến Binh Năng Lượng Xanh</strong></span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      Điểm: {progress.ecoSaverScore} đ
                    </span>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setCurrentTab('game4');
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <span>{progress.ecoSaverCompleted ? 'Chơi Lại' : 'Chơi Ngay'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Parent Report Prompt Card */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-xs shrink-0">
                  <FileSpreadsheet className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900">
                    Hệ Thống Báo Cáo Kết Quả Ôn Tập Cho Phụ Huynh
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl">
                    Tự động phân tích điểm số, đánh giá 4 nhóm năng lực khoa học chuẩn Bộ GD&ĐT, kèm nhận xét sư phạm và lời khuyên để bố mẹ đồng hành cùng con tại nhà. Hỗ trợ in ấn PDF và gửi qua Zalo/Email.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsReportOpen(true);
                }}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs transition-colors whitespace-nowrap shrink-0"
              >
                <span>Mở Phiếu Báo Cáo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Links Footer Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span>Chủ đề 2: Năng lượng (Khoa học 5)</span>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="hover:text-slate-900 font-semibold text-slate-700 cursor-pointer flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                  Đổi tên học sinh & SĐT phụ huynh
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentTab('leaderboard')}
                  className="hover:text-slate-900 font-medium cursor-pointer"
                >
                  Bảng xếp hạng khối 5
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setCurrentTab('badges')}
                  className="hover:text-slate-900 font-medium cursor-pointer"
                >
                  Bộ sưu tập huy hiệu
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Mini-game 1: Match Source */}
        {currentTab === 'game1' && (
          <MatchSourceGame
            onGameComplete={handleGame1Complete}
            onBackToLobby={() => setCurrentTab('lobby')}
            onOpenSGK={() => setIsSGKOpen(true)}
          />
        )}

        {/* Mini-game 2: Energy Lab */}
        {currentTab === 'game2' && (
          <EnergyLabGame
            onGameComplete={handleGame2Complete}
            onBackToLobby={() => setCurrentTab('lobby')}
          />
        )}

        {/* Mini-game 3: Speed Quiz */}
        {currentTab === 'game3' && (
          <SpeedQuizGame
            onGameComplete={handleGame3Complete}
            onBackToLobby={() => setCurrentTab('lobby')}
          />
        )}

        {/* Mini-game 4: Eco Saver */}
        {currentTab === 'game4' && (
          <EcoSaverGame
            onGameComplete={handleGame4Complete}
            onBackToLobby={() => setCurrentTab('lobby')}
          />
        )}

        {/* Leaderboard View */}
        {currentTab === 'leaderboard' && (
          <LeaderboardView
            totalScore={totalScore}
            badgesCount={unlockedBadgesCount}
            onBackToLobby={() => setCurrentTab('lobby')}
          />
        )}

        {/* Badges Collection View */}
        {currentTab === 'badges' && (
          <BadgeCollectionModal
            badges={badges}
            onBackToLobby={() => setCurrentTab('lobby')}
          />
        )}
      </main>

      {/* SGK Viewer Modal */}
      <SGKViewerModal
        isOpen={isSGKOpen}
        onClose={() => setIsSGKOpen(false)}
      />

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onProfileUpdated={refreshProfile}
      />

      {/* Parent Report Modal */}
      <ParentReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        report={parentReport}
        onUpdateProfileRequest={() => {
          setIsReportOpen(false);
          setIsProfileOpen(true);
        }}
      />
    </div>
  );
}
