import React, { useState } from 'react';
import { WHEEL_ITEMS } from '../data/items';
import { speakText, playCorrectSound, playClickSound, playWinSound } from '../utils/audio';
import { SectorGraphic } from './SectorGraphic';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
  RotateCcw,
  Wand2,
  Check,
  CheckCircle2,
  Paintbrush,
  Palette,
  PenTool,
  HelpCircle,
} from 'lucide-react';

export const CRAYON_PALETTE = [
  { name: '갈색 (Brown)', hex: '#8d4b1a', bgClass: 'bg-[#8d4b1a]', borderClass: 'border-[#78350f]' },
  { name: '파란색 (Blue)', hex: '#0284c7', bgClass: 'bg-[#0284c7]', borderClass: 'border-[#0369a1]' },
  { name: '검은색 (Black)', hex: '#1e293b', bgClass: 'bg-[#1e293b]', borderClass: 'border-[#0f172a]' },
  { name: '빨간색 (Red)', hex: '#ef4444', bgClass: 'bg-[#ef4444]', borderClass: 'border-[#dc2626]' },
  { name: '노란색 (Yellow)', hex: '#facc15', bgClass: 'bg-[#facc15]', borderClass: 'border-[#ca8a04]' },
  { name: '초록색 (Green)', hex: '#22c55e', bgClass: 'bg-[#22c55e]', borderClass: 'border-[#16a34a]' },
  { name: '흰색 (White)', hex: '#ffffff', bgClass: 'bg-white', borderClass: 'border-slate-300' },
  { name: '분홍색 (Pink)', hex: '#f472b6', bgClass: 'bg-[#f472b6]', borderClass: 'border-[#db2777]' },
  { name: '보라색 (Purple)', hex: '#a855f7', bgClass: 'bg-[#a855f7]', borderClass: 'border-[#9333ea]' },
  { name: '주황색 (Orange)', hex: '#fb923c', bgClass: 'bg-[#fb923c]', borderClass: 'border-[#ea580c]' },
  { name: '하늘색 (Sky Blue)', hex: '#38bdf8', bgClass: 'bg-[#38bdf8]', borderClass: 'border-[#0284c7]' },
  { name: '살구색 (Skin Peach)', hex: '#fff7ed', bgClass: 'bg-[#fff7ed]', borderClass: 'border-[#fed7aa]' },
];

export const DEFAULT_ITEM_COLORS: Record<number, Record<string, string>> = {
  1: { skin: '#fff7ed', iris: '#8d4b1a', blush: '#fca5a5', eyebrow: '#78350f' },
  2: { skin: '#fff7ed', iris: '#0284c7', blush: '#fca5a5', eyebrow: '#0284c7' },
  3: { hair: '#1e293b', ribbon: '#f43f5e', skin: '#fff7ed', blush: '#fca5a5' },
  4: { hair: '#92400e', skin: '#fff7ed', shirt: '#38bdf8', blush: '#fca5a5' },
  5: { frames: '#ef4444', lens: '#e0f2fe', skin: '#fff7ed', blush: '#fca5a5' },
  6: { frames: '#1e293b', lens: '#f1f5f9', skin: '#fff7ed', blush: '#fca5a5' },
  7: { dress: '#facc15', bow: '#f43f5e', frills: '#fef08a', hanger: '#fb923c' },
  8: { shirt: '#ffffff', collar: '#e2e8f0', bowtie: '#ef4444', pants: '#22c55e', belt: '#15803d' },
};

export const BLANK_ITEM_COLORS: Record<number, Record<string, string>> = {
  1: { skin: '#ffffff', iris: '#ffffff', blush: '#ffffff', eyebrow: '#cbd5e1' },
  2: { skin: '#ffffff', iris: '#ffffff', blush: '#ffffff', eyebrow: '#cbd5e1' },
  3: { hair: '#ffffff', ribbon: '#ffffff', skin: '#ffffff', blush: '#ffffff' },
  4: { hair: '#ffffff', skin: '#ffffff', shirt: '#ffffff', blush: '#ffffff' },
  5: { frames: '#ffffff', lens: '#ffffff', skin: '#ffffff', blush: '#ffffff' },
  6: { frames: '#ffffff', lens: '#ffffff', skin: '#ffffff', blush: '#ffffff' },
  7: { dress: '#ffffff', bow: '#ffffff', frills: '#ffffff', hanger: '#cbd5e1' },
  8: { shirt: '#ffffff', collar: '#ffffff', bowtie: '#ffffff', pants: '#ffffff', belt: '#cbd5e1' },
};

interface WorksheetProps {
  userColors: Record<number, Record<string, string>>;
  onColorPart: (itemId: number, partId: string, color: string) => void;
  onAutoColorItem: (itemId: number) => void;
  onResetItemColor: (itemId: number) => void;
  onResetAllColors: () => void;
  activeItemId: number | null;
  onSelectRow: (itemId: number) => void;
  userAnswers: Record<number, { primary: string; secondary?: string; third?: string }>;
  onAnswerChange: (itemId: number, field: 'primary' | 'secondary' | 'third', value: string) => void;
  showAllAnswers: boolean;
  onToggleShowAllAnswers: () => void;
}

export const Worksheet: React.FC<WorksheetProps> = ({
  userColors,
  onColorPart,
  onAutoColorItem,
  onResetItemColor,
  onResetAllColors,
  activeItemId,
  onSelectRow,
  userAnswers,
  onAnswerChange,
  showAllAnswers,
  onToggleShowAllAnswers,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('#8d4b1a');
  const [viewMode, setViewMode] = useState<'coloring' | 'writing'>('coloring');

  // Currently focused item (defaults to 1 if null)
  const currentId = activeItemId || 1;
  const currentItem = WHEEL_ITEMS.find((i) => i.id === currentId) || WHEEL_ITEMS[0];
  const activeColorObj = CRAYON_PALETTE.find((c) => c.hex.toLowerCase() === selectedColor.toLowerCase()) || {
    name: '선택 색상',
    hex: selectedColor,
  };

  // Check if an item is colored matching its English target color
  const isItemColorCorrect = (itemId: number): boolean => {
    const item = WHEEL_ITEMS.find((i) => i.id === itemId);
    if (!item || !item.targetColors) return true;
    const itemColors = userColors[itemId] || {};

    return item.targetColors.every((tc) => {
      const currentColor = (itemColors[tc.part] || '').toLowerCase();
      if (!currentColor) return false;
      return tc.expectedHexes.some((hex) => hex.toLowerCase() === currentColor);
    });
  };

  const totalColorCorrect = WHEEL_ITEMS.filter((item) => isItemColorCorrect(item.id)).length;

  // Handle coloring a part
  const handlePartColor = (partId: string) => {
    playClickSound();
    onColorPart(currentId, partId, selectedColor);

    // Check if after this coloring it became correct
    setTimeout(() => {
      const nextColors = { ...(userColors[currentId] || {}), [partId]: selectedColor };
      const isNowCorrect = currentItem.targetColors.every((tc) => {
        const col = (nextColors[tc.part] || '').toLowerCase();
        return tc.expectedHexes.some((hex) => hex.toLowerCase() === col);
      });
      if (isNowCorrect) {
        playCorrectSound();
      }
    }, 50);
  };

  // Check and praise for current item
  const handleCheckColoring = () => {
    if (isItemColorCorrect(currentId)) {
      playWinSound();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5, x: 0.7 },
          colors: ['#f43f5e', '#facc15', '#38bdf8', '#4ade80', '#c084fc'],
        });
      } catch {
        // ignore
      }
      speakText(`Great job! ${currentItem.phrase}!`);
    } else {
      playClickSound();
      speakText(`${currentItem.phrase}. Hint: ${currentItem.targetColors.map((t) => t.colorName).join(', ')}`);
    }
  };

  return (
    <div className="relative w-full max-w-xl bg-white/95 rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-pink-300 flex flex-col justify-between backdrop-blur-sm">
      {/* Decorative Top-Right Cute Paperclip */}
      <div className="absolute -top-3 right-6 pointer-events-none transform rotate-12 drop-shadow-sm z-20">
        <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
          <path
            d="M8 12 L8 34 C8 39 12 43 17 43 C22 43 26 39 26 34 L26 8 C26 4 22 0 17 0 C12 0 8 4 8 8 L8 32 C8 35 11 38 14 38 C17 38 20 35 20 32 L20 14"
            stroke="#f43f5e"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div>
        {/* Header & Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-3 mb-4">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1.5 bg-pink-50 p-1 rounded-2xl border border-pink-200">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode('coloring');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                viewMode === 'coloring'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-pink-600'
              }`}
            >
              <Paintbrush className="w-3.5 h-3.5" />
              <span>🎨 색칠하기</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode('writing');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'writing'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-pink-600'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>✏️ 단어 쓰기</span>
            </button>
          </div>

          {/* Status badge & Reset */}
          <div className="flex items-center gap-2">
            <span className="bg-pink-100 text-pink-700 font-bold px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>색칠 완성: <strong className="text-pink-600 font-black">{totalColorCorrect}</strong>/8</span>
            </span>

            <button
              type="button"
              onClick={onResetAllColors}
              className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
              title="전체 도화지 비우기"
            >
              <RotateCcw className="w-3 h-3" />
              초기화
            </button>
          </div>
        </div>

        {/* VIEW 1: COLORING ACTIVITY (MAIN) */}
        {viewMode === 'coloring' && (
          <div className="space-y-4">
            {/* 8 Item Quick Select Chips Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
              {WHEEL_ITEMS.map((item) => {
                const isSelected = item.id === currentId;
                const isCorrect = isItemColorCorrect(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onSelectRow(item.id);
                    }}
                    className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-pink-500 text-white border-pink-500 shadow-sm scale-105'
                        : isCorrect
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-pink-50'
                    }`}
                  >
                    <span>{item.number}번</span>
                    {isCorrect && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Coloring Stage for Current Item */}
            <div className="bg-gradient-to-br from-amber-50/70 via-pink-50/40 to-sky-50/60 rounded-3xl p-4 sm:p-5 border-2 border-pink-200 flex flex-col items-center relative overflow-hidden shadow-inner">
              {/* Top Banner with Phrase & Sound */}
              <div className="w-full flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-black flex items-center justify-center shadow-xs">
                    {currentItem.number}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                      <span>{currentItem.phrase}</span>
                      <button
                        type="button"
                        onClick={() => speakText(currentItem.phrase)}
                        className="p-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors cursor-pointer"
                        title="원어민 발음 듣기"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </h3>
                    <p className="text-xs text-pink-600 font-bold">{currentItem.label}</p>
                  </div>
                </div>

                {/* Target Color Hint pill */}
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-500 block">정답 색상</span>
                  <span className="text-xs font-black text-pink-700 bg-pink-100/90 px-2 py-0.5 rounded-full">
                    {currentItem.targetColors.map((t) => t.colorName).join(' + ')}
                  </span>
                </div>
              </div>

              {/* Central Interactive Coloring Canvas / SVG */}
              <div className="my-2 relative flex items-center justify-center min-h-[140px] w-full bg-white rounded-2xl border border-pink-200/80 p-3 shadow-xs">
                <SectorGraphic
                  itemId={currentItem.id}
                  size={currentItem.id === 8 || currentItem.id === 7 ? 135 : 120}
                  colors={userColors[currentItem.id] || {}}
                  onPartClick={handlePartColor}
                  isInteractive={true}
                />

                {/* Tap to Paint Guide Pill */}
                <div className="absolute bottom-2 right-2 bg-pink-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs pointer-events-none flex items-center gap-1">
                  <Paintbrush className="w-2.5 h-2.5" />
                  <span>그림 부위를 터치해 색칠하세요</span>
                </div>
              </div>

              {/* Action Buttons for Current Item */}
              <div className="w-full flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onAutoColorItem(currentId);
                      playCorrectSound();
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                    title="정답 색으로 자동 완성"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>정답 칠하기</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onResetItemColor(currentId);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                    title="이 그림 도화지 비우기"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-500" />
                    <span>비우기</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCheckColoring}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-black shadow-xs flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>색칠 검사 & 발음</span>
                </button>
              </div>
            </div>

            {/* Crayon Color Palette */}
            <div className="bg-pink-50/60 rounded-2xl p-3 border border-pink-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-700">
                  <Palette className="w-3.5 h-3.5 text-pink-500" />
                  <span>알록달록 크레용 팔레트:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500">현재 색:</span>
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-slate-400 shadow-xs"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="text-xs font-extrabold text-pink-600">{activeColorObj.name}</span>
                </div>
              </div>

              {/* Swatches Grid */}
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                {CRAYON_PALETTE.map((color) => {
                  const isSelected = selectedColor.toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedColor(color.hex);
                      }}
                      className={`h-8 rounded-xl flex items-center justify-center transition-all duration-150 transform cursor-pointer border-2 ${
                        color.borderClass
                      } ${
                        isSelected
                          ? 'scale-115 ring-2 ring-pink-500 shadow-md z-10'
                          : 'hover:scale-105 opacity-90 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <span
                          className={`text-xs font-black ${
                            color.hex === '#ffffff' || color.hex === '#fff7ed' || color.hex === '#facc15'
                              ? 'text-slate-800'
                              : 'text-white'
                          }`}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: WRITING WORKSHEET (TEXTBOOK EXERCISE) */}
        {viewMode === 'writing' && (
          <div>
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
              <span>빈칸에 알맞은 영어 단어를 입력해 보세요.</span>
              <button
                type="button"
                onClick={onToggleShowAllAnswers}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showAllAnswers ? '정답 숨기기' : '정답 보기'}
              </button>
            </div>

            <div className="space-y-3 font-medium text-slate-800">
              {WHEEL_ITEMS.map((item) => {
                const isActive = activeItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectRow(item.id)}
                    className={`flex items-center justify-between p-2 rounded-2xl transition-all cursor-pointer ${
                      isActive ? 'bg-amber-50 ring-2 ring-pink-400 shadow-sm' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                          isActive ? 'bg-pink-600 text-white' : 'bg-slate-700 text-white'
                        }`}
                      >
                        {item.number}
                      </div>

                      {/* Sentence text */}
                      {item.id === 8 ? (
                        <div className="flex items-center gap-1.5 flex-wrap text-sm sm:text-base font-semibold">
                          <span>{item.blanks.prefix}</span>
                          <input
                            type="text"
                            value={showAllAnswers ? item.blanks.blank : userAnswers[8]?.primary || ''}
                            onChange={(e) => onAnswerChange(8, 'primary', e.target.value)}
                            placeholder="shirt"
                            className="w-20 px-2 py-0.5 text-center font-bold text-pink-600 border-b-2 border-slate-400 focus:border-pink-500 focus:outline-none"
                          />
                          <span>and</span>
                          <input
                            type="text"
                            value={showAllAnswers ? item.blanks.secondBlank : userAnswers[8]?.secondary || ''}
                            onChange={(e) => onAnswerChange(8, 'secondary', e.target.value)}
                            placeholder="green"
                            className="w-20 px-2 py-0.5 text-center font-bold text-pink-600 border-b-2 border-slate-400 focus:border-pink-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={showAllAnswers ? item.blanks.secondSuffix : userAnswers[8]?.third || ''}
                            onChange={(e) => onAnswerChange(8, 'third', e.target.value)}
                            placeholder="pants"
                            className="w-20 px-2 py-0.5 text-center font-bold text-pink-600 border-b-2 border-slate-400 focus:border-pink-500 focus:outline-none"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 flex-wrap text-sm sm:text-base font-semibold">
                          {item.blanks.prefix && <span>{item.blanks.prefix}</span>}
                          <input
                            type="text"
                            value={showAllAnswers ? item.blanks.blank : userAnswers[item.id]?.primary || ''}
                            onChange={(e) => onAnswerChange(item.id, 'primary', e.target.value)}
                            placeholder={item.blanks.blank}
                            className="px-2 py-0.5 text-center font-bold text-pink-600 border-b-2 border-slate-400 focus:border-pink-500 focus:outline-none w-24"
                          />
                          {item.blanks.suffix && <span>{item.blanks.suffix}</span>}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(item.phrase);
                      }}
                      className="p-1.5 rounded-full hover:bg-pink-100 text-slate-400 hover:text-pink-600 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
