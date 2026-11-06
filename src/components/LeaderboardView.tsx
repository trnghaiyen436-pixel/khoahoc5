import React, { useState } from 'react';
import { Trophy, Medal, Award, Flame, Users, ArrowLeft } from 'lucide-react';
import { getLeaderboard } from '../utils/storage';
import { sounds } from '../utils/soundEffects';

interface LeaderboardViewProps {
  totalScore: number;
  badgesCount: number;
  onBackToLobby: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  totalScore,
  badgesCount,
  onBackToLobby
}) => {
  const [classFilter, setClassFilter] = useState<string>('all');
  const allEntries = getLeaderboard(totalScore, badgesCount);

  const filteredEntries = classFilter === 'all'
    ? allEntries
    : allEntries.filter(entry => entry.className === classFilter);

  const topThree = filteredEntries.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => {
              sounds.playClick();
              onBackToLobby();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại sảnh trò chơi
          </button>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Trophy className="w-8 h-8 text-amber-500" />
            Bảng Vàng Danh Dự Khối Lớp 5
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Thi đua giải cứu năng lượng và làm chủ kiến thức Khoa học Bài 7
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 self-start sm:self-auto">
          {['all', '5A1', '5A2', '5A3'].map(c => (
            <button
              key={c}
              onClick={() => {
                sounds.playClick();
                setClassFilter(c);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                classFilter === c
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {c === 'all' ? 'Toàn Khối 5' : `Lớp ${c}`}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Visual Display */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 items-end max-w-2xl mx-auto">
          {/* Rank 2 (Silver) */}
          <div className="order-1 flex flex-col items-center">
            <div className="relative mb-2">
              <span className="text-4xl">{topThree[1].avatar}</span>
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center border-2 border-white shadow-xs">
                2
              </span>
            </div>
            <div className="w-full bg-slate-200/80 rounded-t-xl p-3 sm:p-4 text-center border-t-4 border-slate-400">
              <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                {topThree[1].studentName}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">Lớp {topThree[1].className}</p>
              <p className="mt-2 text-sm sm:text-base font-extrabold text-slate-800 font-mono tabular-nums">
                {topThree[1].totalScore} đ
              </p>
            </div>
          </div>

          {/* Rank 1 (Gold - Elevated) */}
          <div className="order-2 flex flex-col items-center">
            <div className="relative mb-2">
              <span className="text-5xl">{topThree[0].avatar}</span>
              <span className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-extrabold text-sm flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                👑
              </span>
            </div>
            <div className="w-full bg-amber-100 rounded-t-2xl p-4 sm:p-5 text-center border-t-4 border-amber-500 shadow-sm">
              <p className="font-extrabold text-sm sm:text-base text-amber-950 truncate">
                {topThree[0].studentName}
              </p>
              <p className="text-xs text-amber-700 font-medium">Lớp {topThree[0].className}</p>
              <p className="mt-2 text-base sm:text-lg font-black text-amber-600 font-mono tabular-nums">
                {topThree[0].totalScore} đ
              </p>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="order-3 flex flex-col items-center">
            <div className="relative mb-2">
              <span className="text-4xl">{topThree[2].avatar}</span>
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-700/80 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-xs">
                3
              </span>
            </div>
            <div className="w-full bg-orange-100/70 rounded-t-xl p-3 sm:p-4 text-center border-t-4 border-orange-400">
              <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                {topThree[2].studentName}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">Lớp {topThree[2].className}</p>
              <p className="mt-2 text-sm sm:text-base font-extrabold text-slate-800 font-mono tabular-nums">
                {topThree[2].totalScore} đ
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Users className="w-4 h-4 text-slate-500" />
            <span>Danh sách xếp hạng chi tiết ({filteredEntries.length} học sinh)</span>
          </div>
          <span className="text-xs text-slate-500">
            Cập nhật liên tục theo điểm số làm bài
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredEntries.map((entry, index) => {
            const rank = index + 1;
            const isCurrentUser = entry.isCurrentUser;

            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between px-4 sm:px-6 py-3.5 transition-colors ${
                  isCurrentUser
                    ? 'bg-amber-50/70 border-l-4 border-l-amber-500'
                    : 'hover:bg-slate-50/70'
                }`}
              >
                {/* Left: Rank & Student Identity */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-7 text-center font-mono font-bold text-sm text-slate-500">
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                  </div>

                  <div className="text-2xl shrink-0">{entry.avatar}</div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-slate-900 truncate">
                        {entry.studentName}
                      </span>
                      {isCurrentUser && (
                        <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-200 text-amber-900 rounded-md shrink-0">
                          Bạn (Em)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>Lớp {entry.className}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {entry.badgesCount} huy hiệu
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <Flame className="w-3.5 h-3.5" />
                        {entry.accuracy}% chính xác
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Score */}
                <div className="text-right shrink-0">
                  <div className="text-base sm:text-lg font-black font-mono tabular-nums text-slate-900">
                    {entry.totalScore.toLocaleString('vi-VN')}
                  </div>
                  <div className="text-[11px] text-slate-400">điểm năng lượng</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
