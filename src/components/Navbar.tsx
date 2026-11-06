import React from 'react';
import { Volume2, VolumeX, FileSpreadsheet, User, BookOpen } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenReport: () => void;
  onOpenProfile: () => void;
  onOpenSGK: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  totalScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenReport,
  onOpenProfile,
  onOpenSGK,
  isMuted,
  onToggleMute,
  totalScore
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element, no subtitle pills) */}
        <button
          onClick={() => {
            sounds.playClick();
            onSelectTab('lobby');
          }}
          className="text-left cursor-pointer group flex items-center gap-2.5 shrink-0 focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-xs font-bold text-lg">
            ⚡
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors whitespace-nowrap">
            Đấu Trường Năng Lượng 5
          </span>
        </button>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('lobby');
            }}
            className={`cursor-pointer whitespace-nowrap hover:text-slate-950 transition-colors ${
              currentTab === 'lobby' ? 'text-amber-600 font-semibold border-b-2 border-amber-500 py-1' : ''
            }`}
          >
            Trang Chủ
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('leaderboard');
            }}
            className={`cursor-pointer whitespace-nowrap hover:text-slate-950 transition-colors ${
              currentTab === 'leaderboard' ? 'text-amber-600 font-semibold border-b-2 border-amber-500 py-1' : ''
            }`}
          >
            Bảng Xếp Hạng
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('badges');
            }}
            className={`cursor-pointer whitespace-nowrap hover:text-slate-950 transition-colors ${
              currentTab === 'badges' ? 'text-amber-600 font-semibold border-b-2 border-amber-500 py-1' : ''
            }`}
          >
            Huy Hiệu
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSGK();
            }}
            className="cursor-pointer whitespace-nowrap hover:text-slate-950 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Tra Cứu SGK
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-800">
            <span>Điểm tích lũy:</span>
            <span className="font-mono tabular-nums text-sm text-amber-900 font-bold">{totalScore.toLocaleString('vi-VN')}</span>
          </div>

          <button
            type="button"
            onClick={onToggleMute}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            title="Hồ sơ học sinh"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onOpenReport}
            className="cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>Báo Cáo Phụ Huynh</span>
          </button>
        </div>
      </div>
    </header>
  );
};
