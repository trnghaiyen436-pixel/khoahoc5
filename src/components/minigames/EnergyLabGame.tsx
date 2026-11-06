import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, BatteryCharging, CheckCircle2, RotateCcw, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { LAB_TARGETS, ENERGY_SOURCES } from '../../data/energyLessonData';
import { EnergySource } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface EnergyLabGameProps {
  onGameComplete: (score: number) => void;
  onBackToLobby: () => void;
}

export const EnergyLabGame: React.FC<EnergyLabGameProps> = ({
  onGameComplete,
  onBackToLobby
}) => {
  const [targetIndex, setTargetIndex] = useState(0);
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [selectedSource, setSelectedSource] = useState<EnergySource | null>(null);
  const [wrongFeedback, setWrongFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentTarget = LAB_TARGETS[targetIndex];

  const energyOptions: { id: EnergySource; label: string; icon: string }[] = [
    { id: 'sun', label: 'Ánh Nắng Mặt Trời', icon: '☀️' },
    { id: 'wind', label: 'Sức Gió Tự Nhiên', icon: '💨' },
    { id: 'water', label: 'Dòng Nước Chảy', icon: '🌊' },
    { id: 'food', label: 'Bữa Ăn Thức Ăn', icon: '🍎' },
    { id: 'fuel', label: 'Nhiên Liệu Xăng Dầu', icon: '⛽' },
    { id: 'electricity', label: 'Nguồn Điện Năng', icon: '⚡' }
  ];

  const handleCharge = (sourceId: EnergySource) => {
    if (isCharging || isActivated) return;
    sounds.playClick();
    setSelectedSource(sourceId);

    if (sourceId === currentTarget.neededSource) {
      // Correct!
      sounds.playPowerUp();
      setWrongFeedback(null);
      setIsCharging(true);

      // Animate battery charge from 0 to 100
      let step = 0;
      const interval = setInterval(() => {
        step += 20;
        setChargeProgress(step);
        if (step >= 100) {
          clearInterval(interval);
          setIsCharging(false);
          setIsActivated(true);
          sounds.playCorrect();
          setScore(prev => prev + 50);
        }
      }, 100);
    } else {
      // Wrong source!
      sounds.playIncorrect();
      setWrongFeedback(`Nguồn năng lượng này chưa phù hợp. ${currentTarget.hint}`);
    }
  };

  const handleNextTarget = () => {
    sounds.playClick();
    if (targetIndex < LAB_TARGETS.length - 1) {
      setTargetIndex(prev => prev + 1);
      setChargeProgress(0);
      setIsActivated(false);
      setSelectedSource(null);
      setWrongFeedback(null);
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      onGameComplete(score);
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setTargetIndex(0);
    setChargeProgress(0);
    setIsActivated(false);
    setSelectedSource(null);
    setWrongFeedback(null);
    setScore(0);
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
            <span>Mini-game 2: Phòng Thí Nghiệm Tiếp Sức Năng Lượng</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Lựa chọn đúng bình năng lượng để kích hoạt sự sống và động cơ hoạt động
          </p>
        </div>

        <div className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs flex items-center gap-2">
          <BatteryCharging className="w-4 h-4 text-emerald-600" />
          <span>Điểm Trạm Năng Lượng:</span>
          <span className="font-mono text-emerald-600 text-sm">{score} đ</span>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Station Counter */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Đối tượng {targetIndex + 1} / {LAB_TARGETS.length}</span>
            <span>Tiến độ thí nghiệm: {Math.round(((targetIndex + 1) / LAB_TARGETS.length) * 100)}%</span>
          </div>

          {/* Interactive Simulation Stage */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-700">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              {/* Target Character / Machine Display */}
              <div className="relative">
                <div className={`text-6xl sm:text-7xl p-4 transition-transform duration-500 ${isActivated ? 'scale-110 animate-float' : ''}`}>
                  {currentTarget.icon}
                </div>
                {isActivated && (
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-950 p-1.5 rounded-full shadow-lg animate-bounce">
                    <Zap className="w-4 h-4 fill-amber-950" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                  {currentTarget.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                  {currentTarget.description}
                </p>
              </div>

              {/* Energy Level Bar */}
              <div className="w-full max-w-xs space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-mono font-semibold">
                  <span className="text-slate-400">Mức năng lượng:</span>
                  <span className={chargeProgress === 100 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {chargeProgress}%
                  </span>
                </div>
                <div className="w-full bg-slate-700/80 h-3 rounded-full overflow-hidden p-0.5 border border-slate-600">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      chargeProgress === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-xs' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    }`}
                    style={{ width: `${chargeProgress}%` }}
                  />
                </div>
              </div>

              {/* Activated Celebration Toast */}
              {isActivated && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/60 max-w-lg w-full text-left flex items-start gap-3 animate-in fade-in duration-300">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-300">NẠP ĐẦY THÀNH CÔNG! (+50 ĐIỂM)</p>
                    <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">{currentTarget.successAction}</p>
                  </div>
                </div>
              )}

              {/* Error feedback */}
              {wrongFeedback && !isActivated && (
                <div className="mt-3 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-200 max-w-md animate-in fade-in">
                  ⚠️ {wrongFeedback}
                </div>
              )}
            </div>
          </div>

          {/* Energy Pod Selection Controls */}
          {!isActivated ? (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Cắm nguồn năng lượng tương ứng vào thiết bị:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {energyOptions.map(opt => {
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isCharging}
                      onClick={() => handleCharge(opt.id)}
                      className="p-3.5 bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 rounded-xl text-left transition-all cursor-pointer shadow-xs flex items-center gap-3 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{opt.icon}</span>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-400">Bấm để nạp pin</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Next Target Action */
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextTarget}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <span>{targetIndex < LAB_TARGETS.length - 1 ? 'Tiếp Tục Vật Thể Sau' : 'Hoàn Thành Trạm'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Finished State */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto shadow-xs">
            ⚡
          </div>
          <div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Xuất Sắc! Phòng Thí Nghiệm Đã Hoạt Động 100%
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Em đã tiếp sức thành công cho tất cả người và máy móc trong bài học!
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-xs text-slate-500 block">Tổng Điểm Kỹ Sư Tiếp Sức</span>
            <span className="font-extrabold text-2xl text-emerald-600 font-mono">
              {score} đ
            </span>
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
