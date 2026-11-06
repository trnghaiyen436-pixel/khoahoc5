import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Clock, Flame, CheckCircle2, XCircle, RotateCcw, ChevronRight, Zap } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/energyLessonData';
import { sounds } from '../../utils/soundEffects';
import { recordCompetencyAnswer } from '../../utils/storage';

interface SpeedQuizGameProps {
  onGameComplete: (score: number, maxStreak: number) => void;
  onBackToLobby: () => void;
}

const QUESTION_TIME_LIMIT = 15; // 15 seconds per question

export const SpeedQuizGame: React.FC<SpeedQuizGameProps> = ({
  onGameComplete,
  onBackToLobby
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (isAnswered || isFinished) return;

    if (timeLeft <= 0) {
      // Timeout counts as incorrect
      sounds.playIncorrect();
      setIsAnswered(true);
      setSelectedOption(-1);
      setStreak(0);
      recordCompetencyAnswer(currentQ.competency, false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isFinished, currentQ]);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    recordCompetencyAnswer(currentQ.competency, isCorrect, streak + 1);

    if (isCorrect) {
      sounds.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      // Speed bonus: +30 base + (timeLeft * 2) + (streak * 10)
      const earned = 30 + timeLeft * 2 + newStreak * 5;
      setScore(prev => prev + earned);
      setCorrectCount(prev => prev + 1);
    } else {
      sounds.playIncorrect();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
      onGameComplete(score, maxStreak);
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setStreak(0);
    setMaxStreak(0);
    setScore(0);
    setCorrectCount(0);
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
            <span>Mini-game 3: Đấu Trí Năng Lượng Siêu Tốc</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            10 câu hỏi thử thách phản xạ và kiến thức trọng tâm Bài 7 Khoa học 5
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-2.5">
          {streak > 1 && (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-800 rounded-lg text-xs font-bold animate-pulse">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
              <span>Combo x{streak}!</span>
            </div>
          )}
          <div className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-xs">
            Điểm: <span className="font-mono text-amber-600 text-sm">{score}</span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Header Row: Progress & Time Left */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Câu {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>

            {/* Countdown bar & clock */}
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-500 animate-spin' : 'text-slate-400'}`} />
              <span className={`font-mono font-bold text-xs ${timeLeft <= 5 ? 'text-rose-600 text-sm' : 'text-slate-600'}`}>
                {timeLeft}s
              </span>
              <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    timeLeft <= 5 ? 'bg-rose-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-800">
              <span className="px-2 py-0.5 bg-amber-100 rounded-md">
                {currentQ.sgkReference}
              </span>
              <span>
                {currentQ.competency === 'identification' ? 'Nhận biết' : currentQ.competency === 'role_analysis' ? 'Thông hiểu vai trò' : 'Vận dụng đời sống'}
              </span>
            </div>

            <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Choices */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctAnswer;

              let style = 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 text-slate-800';
              if (isAnswered) {
                if (isCorrectAnswer) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-400 text-rose-950 font-medium';
                } else {
                  style = 'bg-slate-50 border-slate-200 opacity-60 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Next Button */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 block mb-1">
                  💡 Lời giải thích chi tiết:
                </strong>
                {currentQ.explanation}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Finished Result */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 text-3xl flex items-center justify-center mx-auto shadow-xs">
            🏆
          </div>
          <div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Hoàn Thành Đấu Trí Siêu Tốc!
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Em đã chinh phục trọn vẹn 10 câu hỏi đố vui khoa học Bài 7
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div>
              <span className="text-[11px] text-slate-500 block">Số câu đúng</span>
              <span className="font-extrabold text-lg text-slate-900 font-mono">
                {correctCount} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Chuỗi Combo Max</span>
              <span className="font-extrabold text-lg text-orange-600 font-mono flex items-center justify-center gap-0.5">
                <Flame className="w-4 h-4 fill-orange-500" />
                {maxStreak}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Tổng Điểm</span>
              <span className="font-extrabold text-lg text-amber-600 font-mono">
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
