import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, CheckCircle2, RotateCcw, BookOpen, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { SGK_ACTIVITIES, ENERGY_SOURCES } from '../../data/energyLessonData';
import { EnergySource } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface MatchSourceGameProps {
  onGameComplete: (score: number) => void;
  onBackToLobby: () => void;
  onOpenSGK: () => void;
}

export const MatchSourceGame: React.FC<MatchSourceGameProps> = ({
  onGameComplete,
  onBackToLobby,
  onOpenSGK
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSource, setSelectedSource] = useState<EnergySource | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<{ id: string; correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentActivity = SGK_ACTIVITIES[currentIndex];
  const sourceKeys: EnergySource[] = ['sun', 'wind', 'water', 'food', 'fuel', 'electricity'];

  const handleSelectSource = (src: EnergySource) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedSource(src);
    const correct = src === currentActivity.correctSource;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      setScore(prev => prev + 30);
    } else {
      sounds.playIncorrect();
    }

    setHistory(prev => [...prev, { id: currentActivity.id, correct }]);
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIndex < SGK_ACTIVITIES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedSource(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onGameComplete(score + (isCorrect ? 0 : 0));
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setSelectedSource(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setHistory([]);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
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
            Quay lại sảnh
          </button>
          <h2 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Mini-game 1: Ghép Cặp Nguồn Năng Lượng SGK</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Quan sát từng hình ảnh trong SGK Bài 7 và chọn đúng nguồn năng lượng cung cấp
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSGK}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Mở Trang SGK Gốc</span>
          </button>

          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800">
            Điểm: <span className="font-mono text-amber-600 text-sm">{score}</span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Câu {currentIndex + 1} / {SGK_ACTIVITIES.length}
            </span>
            <div className="flex-1 max-w-xs bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / SGK_ACTIVITIES.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-slate-400">
              {Math.round(((currentIndex + 1) / SGK_ACTIVITIES.length) * 100)}%
            </span>
          </div>

          {/* Activity Question Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-md">
                {currentActivity.sgkLabel}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentActivity.category === 'plant_animal' ? '🌿 Thực vật & Động vật' : currentActivity.category === 'machine' ? '🚜 Máy móc & Phương tiện' : '💨 Hiện tượng tự nhiên'}
              </span>
            </div>

            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                {currentActivity.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                {currentActivity.description}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Câu hỏi: Hoạt động trên nhận năng lượng từ nguồn nào để diễn ra?</span>
            </div>
          </div>

          {/* Energy Sources Choice Grid */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Chọn một nguồn năng lượng phù hợp bên dưới:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sourceKeys.map(key => {
                const source = ENERGY_SOURCES[key];
                const isSelected = selectedSource === key;
                const isThisCorrect = key === currentActivity.correctSource;

                let cardStyle = 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30';
                if (isAnswered) {
                  if (isThisCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-rose-50 border-rose-400 text-rose-950 opacity-70';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-200 opacity-50';
                  }
                }

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectSource(key)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[105px] shadow-xs ${cardStyle}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">
                        {key === 'sun' && '☀️'}
                        {key === 'wind' && '💨'}
                        {key === 'water' && '🌊'}
                        {key === 'food' && '🍎'}
                        {key === 'fuel' && '⛽'}
                        {key === 'electricity' && '⚡'}
                      </span>
                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">
                        {source.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {source.shortName}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Banner when answered */}
          {isAnswered && (
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                {isCorrect ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Chính xác tuyệt vời! (+30 điểm)</span>
                  </>
                ) : (
                  <span>Chưa chính xác rồi em ơi! Cùng xem đáp án đúng nhé:</span>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-3">
                {currentActivity.explanation}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{currentIndex < SGK_ACTIVITIES.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Finished Screen */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 text-3xl flex items-center justify-center mx-auto shadow-xs">
            🎉
          </div>
          <div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Hoàn Thành Mini-game 1!
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Em đã khám phá toàn bộ các hình ảnh trong bài 7 SGK Khoa học 5
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-around text-center">
            <div>
              <span className="text-xs text-slate-500 block">Số câu đúng</span>
              <span className="font-extrabold text-xl text-slate-900 font-mono">
                {history.filter(h => h.correct).length} / {SGK_ACTIVITIES.length}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Điểm đạt được</span>
              <span className="font-extrabold text-xl text-amber-600 font-mono">
                {score} đ
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại</span>
            </button>
            <button
              onClick={onBackToLobby}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-semibold text-white cursor-pointer shadow-xs"
            >
              <span>Về Sảnh Trò Chơi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
