import React from 'react';
import { Volume2, Sparkles, Award } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HeaderProps {
  score: number;
  total: number;
}

export const Header: React.FC<HeaderProps> = ({ score, total }) => {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 pt-6 pb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Title with STEP 1 badge exactly matching textbook */}
      <div className="flex items-center gap-3">
        {/* STEP 1 Badge with speech bubble style in textbook magenta */}
        <div className="relative flex-shrink-0">
          <div className="bg-pink-500 text-white font-black px-3.5 py-1.5 rounded-2xl text-sm md:text-base flex flex-col items-center justify-center shadow-md leading-none">
            <span className="text-[10px] tracking-wider font-extrabold opacity-95">STEP</span>
            <span className="text-lg font-black leading-tight">1</span>
          </div>
          {/* Bubble tail */}
          <div className="absolute -bottom-1 left-2.5 w-2.5 h-2.5 bg-pink-500 transform rotate-45"></div>
        </div>

        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            원판의 그림을 보고, 어구를 완성해 보세요.
          </h1>
          <p className="text-xs md:text-sm text-slate-600 font-medium mt-0.5">
            🎨 원판을 돌려 당첨된 귀여운 캐릭터와 옷을 예쁜 색으로 색칠해 보세요!
          </p>
        </div>
      </div>

      {/* Progress pill */}
      <div className="flex items-center gap-3 self-end md:self-auto bg-white/90 backdrop-blur-xs px-4 py-2 rounded-2xl border border-pink-200 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Award className="w-4 h-4 text-pink-500" />
          <span>학습 달성도:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-24 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(score / total) * 100}%` }}
            />
          </div>
          <span className="text-xs font-black text-pink-600 ml-1">
            {score}/{total}
          </span>
        </div>
      </div>
    </header>
  );
};
