import React, { useRef, useEffect } from 'react';
import { WHEEL_ITEMS } from '../data/items';
import { SectorGraphic } from './SectorGraphic';
import { playTickSound } from '../utils/audio';

interface WheelSvgProps {
  rotation: number;
  isSpinning: boolean;
  selectedItemId: number | null;
  highlightedItemId: number | null;
  onSliceClick?: (id: number) => void;
  onSpinClick?: () => void;
  userColors?: Record<number, Record<string, string>>;
}

export const WheelSvg: React.FC<WheelSvgProps> = ({
  rotation,
  isSpinning,
  selectedItemId,
  highlightedItemId,
  onSliceClick,
  onSpinClick,
  userColors = {},
}) => {
  const lastTickAngleRef = useRef<number>(rotation);

  // Play tick sound when passing sector boundaries while spinning
  useEffect(() => {
    if (!isSpinning) return;
    const diff = Math.abs(rotation - lastTickAngleRef.current);
    if (diff >= 45) {
      playTickSound(1 + ((rotation % 360) / 720));
      lastTickAngleRef.current = rotation;
    }
  }, [rotation, isSpinning]);

  const cx = 250;
  const cy = 250;
  const outerR = 240;
  const rimInnerR = 216;
  const hubR = 48;

  // Generate SVG path for a circular sector arc
  const getSectorPath = (startDeg: number, endDeg: number, innerRadius: number, outerRadius: number) => {
    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const x1 = cx + outerRadius * Math.cos(toRad(startDeg));
    const y1 = cy + outerRadius * Math.sin(toRad(startDeg));
    const x2 = cx + outerRadius * Math.cos(toRad(endDeg));
    const y2 = cy + outerRadius * Math.sin(toRad(endDeg));

    const x3 = cx + innerRadius * Math.cos(toRad(endDeg));
    const y3 = cy + innerRadius * Math.sin(toRad(endDeg));
    const x4 = cx + innerRadius * Math.cos(toRad(startDeg));
    const y4 = cy + innerRadius * Math.sin(toRad(startDeg));

    const largeArc = endDeg - startDeg > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  // Outer polka dots
  const dotsCount = 32;
  const dotElements = Array.from({ length: dotsCount }, (_, i) => {
    const angle = (i * 360) / dotsCount;
    const rad = ((angle - 90) * Math.PI) / 180;
    const r = (outerR + rimInnerR) / 2;
    const dx = cx + r * Math.cos(rad);
    const dy = cy + r * Math.sin(rad);
    return <circle key={i} cx={dx} cy={dy} r="4" fill="#d8b4fe" fillOpacity="0.85" />;
  });

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Top pointer / indicator (needle) matching textbook pink */}
      <div className="absolute -top-4 z-20 flex flex-col items-center pointer-events-none drop-shadow-md">
        <svg width="40" height="42" viewBox="0 0 40 42" fill="none">
          <path
            d="M20 40 L6 10 C3 4 8 0 14 0 L26 0 C32 0 37 4 34 10 L20 40 Z"
            fill="#ec4899"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <circle cx="20" cy="12" r="4.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Main Wheel Container */}
      <div
        className="relative cursor-pointer transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99] touch-manipulation"
        onClick={() => {
          if (!isSpinning && onSpinClick) {
            onSpinClick();
          }
        }}
        title="클릭하여 원판 돌리기!"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 500"
          className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] drop-shadow-xl"
        >
          <defs>
            {/* Outer Rim Gradient - Textbook Deep Purple */}
            <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#7e3b7b" />
              <stop offset="100%" stopColor="#581c87" />
            </radialGradient>

            {/* Hub Gradient */}
            <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#6b21a8" />
            </radialGradient>

            {/* Drop shadow filter for slice highlight */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f43f5e" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Rotating Wheel Group */}
          <g
            style={{
              transformOrigin: '250px 250px',
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
          >
            {/* Outer Purple Rim with polka dots */}
            <circle cx={cx} cy={cy} r={outerR} fill="url(#rimGrad)" stroke="#4c1d95" strokeWidth="2" />
            {dotElements}

            {/* Inner Wheel Background */}
            <circle cx={cx} cy={cy} r={rimInnerR} fill="#fffdf5" stroke="#7e3b7b" strokeWidth="3" />

            {/* 8 Slices */}
            {WHEEL_ITEMS.map((item, idx) => {
              const startAngle = idx * 45;
              const endAngle = (idx + 1) * 45;
              const midAngle = startAngle + 22.5;
              const rad = ((midAngle - 90) * Math.PI) / 180;
              const graphicDist = 135;
              const gx = cx + graphicDist * Math.cos(rad);
              const gy = cy + graphicDist * Math.sin(rad);

              const isHighlighted = highlightedItemId === item.id || selectedItemId === item.id;

              return (
                <g
                  key={item.id}
                  onClick={(e) => {
                    if (!isSpinning && onSliceClick) {
                      e.stopPropagation();
                      onSliceClick(item.id);
                    }
                  }}
                  className="transition-opacity duration-200 cursor-pointer"
                >
                  {/* Slice Wedge Surface */}
                  <path
                    d={getSectorPath(startAngle, endAngle, hubR, rimInnerR)}
                    fill={isHighlighted ? '#fef08a' : idx % 2 === 0 ? '#ffffff' : '#fcfaff'}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    filter={isHighlighted ? 'url(#glow)' : undefined}
                  />

                  {/* Slice Divider Radial Line */}
                  <line
                    x1={cx + hubR * Math.cos(((startAngle - 90) * Math.PI) / 180)}
                    y1={cy + hubR * Math.sin(((startAngle - 90) * Math.PI) / 180)}
                    x2={cx + rimInnerR * Math.cos(((startAngle - 90) * Math.PI) / 180)}
                    y2={cy + rimInnerR * Math.sin(((startAngle - 90) * Math.PI) / 180)}
                    stroke="#7e3b7b"
                    strokeWidth="2"
                  />

                  {/* Graphic Illustration in Slice */}
                  <g transform={`translate(${gx}, ${gy})`}>
                    <g transform="translate(-40, -32)">
                      <foreignObject width="80" height="65">
                        <div className="w-full h-full flex items-center justify-center pointer-events-none">
                          <SectorGraphic
                            itemId={item.id}
                            size={item.id === 8 ? 68 : item.id === 7 || item.id === 3 ? 62 : 66}
                            colors={userColors[item.id]}
                          />
                        </div>
                      </foreignObject>
                    </g>
                  </g>
                </g>
              );
            })}

            {/* Center Purple Hub with 8 sectors and numbers */}
            <circle cx={cx} cy={cy} r={hubR} fill="url(#hubGrad)" stroke="#ffffff" strokeWidth="3" />

            {/* Center Hub Numbers 1-8 */}
            {WHEEL_ITEMS.map((item, idx) => {
              const startAngle = idx * 45;
              const midAngle = startAngle + 22.5;
              const rad = ((midAngle - 90) * Math.PI) / 180;
              const numDist = 28;
              const nx = cx + numDist * Math.cos(rad);
              const ny = cy + numDist * Math.sin(rad);

              const isHubHighlighted = highlightedItemId === item.id || selectedItemId === item.id;

              return (
                <g key={`num-${item.id}`}>
                  {/* Hub slice divider line */}
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx + hubR * Math.cos(((startAngle - 90) * Math.PI) / 180)}
                    y2={cy + hubR * Math.sin(((startAngle - 90) * Math.PI) / 180)}
                    stroke="#c084fc"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                  />

                  {/* Hub Number Badge */}
                  <circle
                    cx={nx}
                    cy={ny}
                    r={isHubHighlighted ? 11 : 9}
                    fill={isHubHighlighted ? '#ffffff' : '#7c3aed'}
                    stroke={isHubHighlighted ? '#ec4899' : '#a855f7'}
                    strokeWidth={isHubHighlighted ? 2 : 1}
                  />
                  <text
                    x={nx}
                    y={ny + 4}
                    textAnchor="middle"
                    fill={isHubHighlighted ? '#be185d' : '#f8fafc'}
                    fontSize={isHubHighlighted ? '13' : '11'}
                    fontWeight="800"
                    fontFamily="Nunito, sans-serif"
                  >
                    {item.number}
                  </text>
                </g>
              );
            })}

            {/* Center Pivot Pin */}
            <circle cx={cx} cy={cy} r="8" fill="#ffffff" stroke="#7e22ce" strokeWidth="2.5" />
          </g>

          {/* Center SPIN Button Overlay (stationary center cap for easy clicking) */}
          <g
            className="cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              if (!isSpinning && onSpinClick) {
                onSpinClick();
              }
            }}
          >
            <circle
              cx={cx}
              cy={cy}
              r="24"
              fill="#ec4899"
              stroke="#ffffff"
              strokeWidth="3"
              className="group-hover:fill-pink-600 transition-colors drop-shadow-md"
            />
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontWeight="900"
              fontFamily="Nunito, sans-serif"
              letterSpacing="0.5"
            >
              {isSpinning ? '...' : 'SPIN'}
            </text>
          </g>
        </svg>
      </div>

      {/* Floating spin button below wheel */}
      <div className="mt-4 flex flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={onSpinClick}
          disabled={isSpinning}
          className={`px-8 py-2.5 rounded-full font-bold text-base shadow-lg transition-all duration-200 transform ${
            isSpinning
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed scale-95'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:shadow-pink-500/30 hover:scale-105 active:scale-95 cursor-pointer'
          }`}
        >
          {isSpinning ? '🌀 신나게 돌아가는 중...' : '🎯 원판 돌리기 (SPIN)'}
        </button>
        <p className="text-xs text-slate-500 font-medium">원판이나 가운데 버튼을 클릭해도 돌아갑니다!</p>
      </div>
    </div>
  );
};
