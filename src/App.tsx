/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { WHEEL_ITEMS } from './data/items';
import { WheelItem } from './types';
import { WheelSvg } from './components/WheelSvg';
import { Worksheet, DEFAULT_ITEM_COLORS, BLANK_ITEM_COLORS } from './components/Worksheet';
import { Header } from './components/Header';
import { ResultCard } from './components/ResultCard';
import { CardsGrid } from './components/CardsGrid';
import { playWinSound, speakText, playClickSound, playCorrectSound } from './utils/audio';

export default function App() {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [activeItemId, setActiveItemId] = useState<number | null>(1);
  const [resultItem, setResultItem] = useState<WheelItem | null>(null);
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);

  // User colored drawings state: itemId -> { partName: hexColor }
  const [userColors, setUserColors] = useState<Record<number, Record<string, string>>>(DEFAULT_ITEM_COLORS);

  // User worksheet answers: key is item ID (1..8)
  const [userAnswers, setUserAnswers] = useState<
    Record<number, { primary: string; secondary?: string; third?: string }>
  >({});

  const currentRotationRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Check if an item matches the required English phrase color
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

  const calculateColorScore = () => {
    return WHEEL_ITEMS.filter((item) => isItemColorCorrect(item.id)).length;
  };

  // Color part handler
  const handleColorPart = (itemId: number, partId: string, color: string) => {
    setUserColors((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [partId]: color,
      },
    }));
  };

  // Auto color item to target colors
  const handleAutoColorItem = (itemId: number) => {
    if (DEFAULT_ITEM_COLORS[itemId]) {
      setUserColors((prev) => ({
        ...prev,
        [itemId]: { ...DEFAULT_ITEM_COLORS[itemId] },
      }));
    }
  };

  // Reset single item color
  const handleResetItemColor = (itemId: number) => {
    if (BLANK_ITEM_COLORS[itemId]) {
      setUserColors((prev) => ({
        ...prev,
        [itemId]: { ...BLANK_ITEM_COLORS[itemId] },
      }));
    }
  };

  // Reset all items to blank
  const handleResetAllColors = () => {
    playClickSound();
    setUserColors(BLANK_ITEM_COLORS);
  };

  // Spin the wheel to a specific or random sector
  const spinToItem = useCallback(
    (targetItem?: WheelItem) => {
      if (isSpinning) return;

      playClickSound();
      setIsSpinning(true);
      setResultItem(null);

      // Choose target item (random or specified)
      const selected =
        targetItem || WHEEL_ITEMS[Math.floor(Math.random() * WHEEL_ITEMS.length)];

      const centerAngle = (selected.number - 0.5) * 45;
      const targetBaseAngle = (360 - centerAngle) % 360;

      const currentRot = currentRotationRef.current;
      const currentMod = ((currentRot % 360) + 360) % 360;

      const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
      const jitter = (Math.random() - 0.5) * 16;

      let delta = targetBaseAngle - currentMod;
      if (delta <= 0) {
        delta += 360;
      }
      const finalTargetRotation = currentRot + extraSpins + delta + jitter;

      const duration = 4200;
      const startTime = performance.now();
      const startRotation = currentRot;

      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3.8);
      };

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        const newRot = startRotation + (finalTargetRotation - startRotation) * eased;
        setRotation(newRot);
        currentRotationRef.current = newRot;

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Finished spinning!
          setIsSpinning(false);
          setActiveItemId(selected.id);
          setResultItem(selected);
          playWinSound();

          try {
            confetti({
              particleCount: 75,
              spread: 70,
              origin: { y: 0.6, x: 0.35 },
              colors: ['#f97316', '#f43f5e', '#3b82f6', '#10b981', '#eab308', '#8b5cf6'],
            });
          } catch {
            // Ignore
          }

          speakText(`Number ${selected.number}. ${selected.phrase}`);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [isSpinning]
  );

  // Apply answer from result card
  const handleApplyAnswer = (item: WheelItem) => {
    setActiveItemId(item.id);
    handleAutoColorItem(item.id);
    setUserAnswers((prev) => ({
      ...prev,
      [item.id]: {
        primary: item.blanks.blank,
        secondary: item.blanks.secondBlank,
        third: item.blanks.secondSuffix,
      },
    }));
  };

  // Update specific answer field
  const handleAnswerChange = (
    itemId: number,
    field: 'primary' | 'secondary' | 'third',
    value: string
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-pink-50 text-slate-800 flex flex-col justify-between relative overflow-hidden pb-12">
      {/* Decorative Sky Background Elements */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-sky-200/40 to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Bottom-Left Balloons matching textbook */}
      <div className="fixed bottom-6 left-6 pointer-events-none select-none z-0 opacity-90 hidden sm:block">
        <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
          {/* Coral / Pink Balloon */}
          <g transform="translate(10, 20)">
            <ellipse cx="35" cy="45" rx="30" ry="38" fill="#f87171" />
            <path d="M35 83 L30 90 L40 90 Z" fill="#ef4444" />
            <ellipse cx="24" cy="30" rx="7" ry="12" fill="#ffffff" fillOpacity="0.45" transform="rotate(-20 24 30)" />
            <path d="M35 90 Q40 120 50 150" stroke="#94a3b8" strokeWidth="2" fill="none" />
          </g>
          {/* Sky Blue Balloon */}
          <g transform="translate(55, 45)">
            <ellipse cx="32" cy="42" rx="27" ry="34" fill="#60a5fa" />
            <path d="M32 76 L28 82 L36 82 Z" fill="#3b82f6" />
            <ellipse cx="22" cy="28" rx="6" ry="10" fill="#ffffff" fillOpacity="0.45" transform="rotate(-20 22 28)" />
            <path d="M32 82 Q28 115 20 140" stroke="#94a3b8" strokeWidth="2" fill="none" />
          </g>
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <Header score={calculateColorScore()} total={8} />

        {/* Main Interactive Stage: Left Wheel + Right Worksheet */}
        <main className="w-full max-w-6xl mx-auto px-4 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-items-center">
          {/* Left Column: Interactive Spinning Wheel */}
          <section
            aria-label="돌아가는 원판"
            className="lg:col-span-6 w-full flex flex-col items-center justify-center p-2 sm:p-4"
          >
            <WheelSvg
              rotation={rotation}
              isSpinning={isSpinning}
              selectedItemId={activeItemId}
              highlightedItemId={activeItemId}
              userColors={userColors}
              onSliceClick={(id) => {
                const item = WHEEL_ITEMS.find((i) => i.id === id);
                if (item) {
                  setActiveItemId(item.id);
                  playClickSound();
                  speakText(item.phrase);
                }
              }}
              onSpinClick={() => spinToItem()}
            />
          </section>

          {/* Right Column: Interactive Coloring Worksheet */}
          <section
            aria-label="색칠하기 학습지"
            className="lg:col-span-6 w-full flex justify-center"
          >
            <Worksheet
              userColors={userColors}
              onColorPart={handleColorPart}
              onAutoColorItem={handleAutoColorItem}
              onResetItemColor={handleResetItemColor}
              onResetAllColors={handleResetAllColors}
              activeItemId={activeItemId}
              onSelectRow={(id) => {
                setActiveItemId(id);
                const item = WHEEL_ITEMS.find((i) => i.id === id);
                if (item) {
                  playClickSound();
                }
              }}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showAllAnswers={showAllAnswers}
              onToggleShowAllAnswers={() => setShowAllAnswers((prev) => !prev)}
            />
          </section>
        </main>

        {/* Bottom Cards Grid for Quick Exploration */}
        <CardsGrid
          activeItemId={activeItemId}
          userColors={userColors}
          onSelectItem={(id) => {
            setActiveItemId(id);
          }}
        />
      </div>

      {/* Result Card Modal */}
      {resultItem && (
        <ResultCard
          item={resultItem}
          userColors={userColors}
          onClose={() => setResultItem(null)}
          onApplyAnswer={handleApplyAnswer}
        />
      )}
    </div>
  );
}
