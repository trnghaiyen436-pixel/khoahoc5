import React from 'react';
import { Award, CheckCircle2, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import { Badge } from '../types';
import { sounds } from '../utils/soundEffects';

interface BadgeCollectionModalProps {
  badges: Badge[];
  onBackToLobby: () => void;
}

export const BadgeCollectionModal: React.FC<BadgeCollectionModalProps> = ({
  badges,
  onBackToLobby
}) => {
  const unlockedCount = badges.filter(b => b.isUnlocked).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Award className="w-8 h-8 text-amber-500" />
              Bộ Sưu Tập Huy Hiệu Khoa Học
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Phấn đấu mở khóa tất cả huy hiệu vinh dự trong Bài 7: Vai trò của năng lượng
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-amber-900">
              Đã đạt: <span className="font-mono text-base">{unlockedCount}</span> / {badges.length} Huy Hiệu
            </span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map(badge => {
          return (
            <div
              key={badge.id}
              className={`relative rounded-2xl p-6 border transition-all ${
                badge.isUnlocked
                  ? 'bg-white border-amber-200 shadow-sm hover:shadow-md'
                  : 'bg-slate-50/70 border-slate-200 opacity-75'
              }`}
            >
              {/* Badge Icon Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xs transition-transform ${
                    badge.isUnlocked
                      ? `bg-gradient-to-tr ${badge.color} text-white scale-100 shadow-amber-200`
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {badge.icon === 'BookOpen' && '📖'}
                  {badge.icon === 'BatteryCharging' && '⚡'}
                  {badge.icon === 'Zap' && '🚀'}
                  {badge.icon === 'Leaf' && '🌿'}
                  {badge.icon === 'Award' && '🏆'}
                  {badge.icon === 'Star' && '⭐'}
                </div>

                {badge.isUnlocked ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã mở khóa
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-500 rounded-full">
                    <Lock className="w-3.5 h-3.5" />
                    Chưa đạt
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-bold text-lg text-slate-900 mb-1.5">
                {badge.title}
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {badge.description}
              </p>

              {/* Requirement footer */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Nhiệm vụ: {badge.requirement}</span>
                {badge.unlockedAt && (
                  <span className="text-amber-600 font-mono font-medium">{badge.unlockedAt}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
