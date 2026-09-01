import React from 'react';
import { WheelItem } from '../types';
import { SectorGraphic } from './SectorGraphic';
import { Volume2, Sparkles, X, ArrowRight, Check } from 'lucide-react';
import { speakText, playClickSound } from '../utils/audio';

interface ResultCardProps {
  item: WheelItem;
  onClose: () => void;
  onApplyAnswer: (item: WheelItem) => void;
  userColors?: Record<number, Record<string, string>>;
}

export const ResultCard: React.FC<ResultCardProps> = ({ item, onClose, onApplyAnswer, userColors = {} }) => {
  const handleSpeak = () => {
    speakText(item.phrase);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-4 border-pink-400 text-center transform scale-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-extrabold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>{item.number}번 원판 당첨!</span>
        </div>

        {/* Graphic */}
        <div className="my-3 flex items-center justify-center h-28 bg-amber-50/70 rounded-2xl border border-amber-200/60 p-2">
          <SectorGraphic itemId={item.id} size={item.id === 8 ? 95 : 85} colors={userColors[item.id]} />
        </div>

        {/* English Phrase */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{item.phrase}</h3>
          <button
            type="button"
            onClick={handleSpeak}
            className="p-1.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-md transition-transform active:scale-95 cursor-pointer"
            title="발음 듣기"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Korean Meaning */}
        <p className="text-sm font-semibold text-pink-600 mb-1">{item.label}</p>
        <p className="text-xs text-slate-500 mb-5">{item.description}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onApplyAnswer(item);
              onClose();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>이 그림 색칠하기</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
