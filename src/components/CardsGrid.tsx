import React from 'react';
import { WHEEL_ITEMS } from '../data/items';
import { SectorGraphic } from './SectorGraphic';
import { Volume2 } from 'lucide-react';
import { speakText, playClickSound } from '../utils/audio';

interface CardsGridProps {
  onSelectItem: (id: number) => void;
  activeItemId: number | null;
  userColors?: Record<number, Record<string, string>>;
}

export const CardsGrid: React.FC<CardsGridProps> = ({ onSelectItem, activeItemId, userColors = {} }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
          <span>📚 8개 어구 카드 한눈에 보기</span>
        </h2>
        <span className="text-xs text-slate-500 font-medium">카드를 누르면 발음을 듣고 색칠 화면으로 이동합니다</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {WHEEL_ITEMS.map((item) => {
          const isActive = activeItemId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                playClickSound();
                onSelectItem(item.id);
                speakText(item.phrase);
              }}
              className={`p-3 rounded-2xl bg-white transition-all duration-200 cursor-pointer flex flex-col items-center text-center border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                isActive
                  ? 'border-pink-500 ring-2 ring-pink-300 bg-pink-50/40'
                  : 'border-slate-200/80 hover:border-pink-300'
              }`}
            >
              {/* Number */}
              <div className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center mb-1">
                {item.number}
              </div>

              {/* Graphic */}
              <div className="h-16 flex items-center justify-center my-1 w-full">
                <SectorGraphic
                  itemId={item.id}
                  size={item.id === 8 ? 54 : item.id === 7 || item.id === 3 ? 50 : 52}
                  colors={userColors[item.id]}
                />
              </div>

              {/* Text */}
              <div className="text-xs font-bold text-slate-800 leading-tight mt-1 line-clamp-1">
                {item.phrase}
              </div>
              <div className="text-[10px] text-pink-600 font-medium mt-0.5">{item.label}</div>

              {/* Speak button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(item.phrase);
                }}
                className="mt-1.5 p-1 rounded-full text-slate-400 hover:text-pink-600 hover:bg-pink-100 transition-colors"
                title="발음 듣기"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
