import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Leaf, CheckCircle2, XCircle, RotateCcw, ChevronRight, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ECO_ITEMS } from '../../data/energyLessonData';
import { sounds } from '../../utils/soundEffects';
import { recordCompetencyAnswer } from '../../utils/storage';

interface EcoSaverGameProps {
  onGameComplete: (score: number) => void;
  onBackToLobby: () => void;
}

export const EcoSaverGame: React.FC<EcoSaverGameProps> = ({
  onGameComplete,
  onBackToLobby
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = ECO_ITEMS[currentIndex];
  const isClassification = currentItem.type !== undefined;

  const handleClassify = (chosenType: 'renewable' | 'non-renewable') => {
    if (isAnswered) return;
    sounds.playClick();
    const correct = currentItem.type === chosenType;
    setIsAnswered(true);
    setIsCorrect(correct);
    recordCompetencyAnswer('application_saving', correct);

    if (correct) {
      sounds.playCorrect();
      setScore(prev => prev + 30);
    } else {
      sounds.playIncorrect();
    }
  };

  const handleJudgeBehavior = (isGoodAction: boolean) => {
    if (isAnswered) return;
    sounds.playClick();
    const correct = currentItem.isGood === isGoodAction;
    setIsAnswered(true);
    setIsCorrect(correct);
    recordCompetencyAnswer('application_saving', correct);

    if (correct) {
      sounds.playCorrect();
      setScore(prev => prev + 30);
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIndex < ECO_ITEMS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 }
      });
      onGameComplete(score);
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
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
            <span>Mini-game 4: Vệ Sĩ Năng Lượng Xanh</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Phân loại nguồn năng lượng sạch và rèn luyện thói quen tiết kiệm điện
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>Điểm Xanh:</span>
          <span className="font-mono text-emerald-600 text-sm">{score} đ</span>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Thử thách {currentIndex + 1} / {ECO_ITEMS.length}</span>
            <span>
              {isClassification ? 'Chủ đề: Nguồn Năng Lượng' : 'Chủ đề: Hành Vi Tiết Kiệm Năng Lượng'}
            </span>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-4 shadow-xs">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-5xl mx-auto shadow-inner">
              {currentItem.icon}
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-md mb-2">
                {isClassification ? 'Phân Loại Năng Lượng' : 'Tình Huống Gia Đình'}
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">
                {currentItem.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {isClassification
                ? 'Đây là nguồn năng lượng Tái tạo (sạch, vô tận) hay Không tái tạo (có hạn, cạn kiệt)?'
                : 'Theo em, đây là hành động Đúng đắn (Tiết kiệm) hay Sai lầm (Lãng phí)?'}
            </p>
          </div>

          {/* Interactive Decision Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {isClassification ? (
              <>
                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleClassify('renewable')}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm flex flex-col items-center gap-2 shadow-xs ${
                    isAnswered && currentItem.type === 'renewable'
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 text-slate-800'
                  }`}
                >
                  <span className="text-2xl">🌱</span>
                  <span>Năng Lượng Tái Tạo</span>
                  <span className="text-[11px] font-normal text-slate-500">Mặt Trời, Gió, Nước...</span>
                </button>

                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleClassify('non-renewable')}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm flex flex-col items-center gap-2 shadow-xs ${
                    isAnswered && currentItem.type === 'non-renewable'
                      ? 'bg-amber-100 border-amber-500 text-amber-950 ring-2 ring-amber-500'
                      : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 text-slate-800'
                  }`}
                >
                  <span className="text-2xl">🛢️</span>
                  <span>Không Tái Tạo</span>
                  <span className="text-[11px] font-normal text-slate-500">Than đá, Dầu mỏ, Khí gas...</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleJudgeBehavior(true)}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm flex flex-col items-center gap-2 shadow-xs ${
                    isAnswered && currentItem.isGood
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 text-slate-800'
                  }`}
                >
                  <ThumbsUp className="w-7 h-7 text-emerald-600" />
                  <span>Hành Động Đúng (Tiết Kiệm)</span>
                  <span className="text-[11px] font-normal text-slate-500">Đáng khen ngợi</span>
                </button>

                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleJudgeBehavior(false)}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm flex flex-col items-center gap-2 shadow-xs ${
                    isAnswered && !currentItem.isGood
                      ? 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-500'
                      : 'bg-white border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 text-slate-800'
                  }`}
                >
                  <ThumbsDown className="w-7 h-7 text-rose-600" />
                  <span>Hành Động Sai (Lãng Phí)</span>
                  <span className="text-[11px] font-normal text-slate-500">Cần phải khắc phục</span>
                </button>
              </>
            )}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div
              className={`p-4 rounded-xl border transition-all animate-in fade-in ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Em trả lời rất chính xác! (+30 điểm)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-amber-600" />
                    <span>Chưa đúng rồi! Cùng tìm hiểu nhé:</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-3">
                {currentItem.explanation || currentItem.reason}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>{currentIndex < ECO_ITEMS.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Finished Screen */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto shadow-xs">
            🌿
          </div>
          <div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Hoàn Thành Vệ Sĩ Năng Lượng Xanh!
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Em đã là một công dân nhí có ý thức bảo vệ môi trường và tiết kiệm năng lượng xuất sắc
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-xs text-slate-500 block">Tổng Điểm Năng Lượng Xanh</span>
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
              <span>Thử thách lại</span>
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
