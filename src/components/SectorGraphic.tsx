import React from 'react';

export interface SectorGraphicProps {
  itemId: number;
  size?: number;
  className?: string;
  colors?: Record<string, string>;
  onPartClick?: (partId: string) => void;
  isInteractive?: boolean;
}

export const SectorGraphic: React.FC<SectorGraphicProps> = ({
  itemId,
  size = 80,
  className = '',
  colors = {},
  onPartClick,
  isInteractive = false,
}) => {
  const getPartColor = (partId: string, defaultColor: string) => {
    return colors[partId] || defaultColor;
  };

  const handlePartClick = (e: React.MouseEvent, partId: string) => {
    if (onPartClick && isInteractive) {
      e.stopPropagation();
      onPartClick(partId);
    }
  };

  const partStyle = isInteractive
    ? 'cursor-pointer transition-all duration-150 hover:opacity-85 hover:stroke-pink-500 hover:stroke-[2.5px]'
    : '';

  switch (itemId) {
    case 1: {
      // 1: brown eyes (초롱초롱 귀여운 갈색 눈 & 볼터치 캐릭터)
      const skin = getPartColor('skin', '#fff7ed');
      const iris = getPartColor('iris', '#8d4b1a');
      const blush = getPartColor('blush', '#fca5a5');
      const eyebrow = getPartColor('eyebrow', '#78350f');

      return (
        <svg
          width={size}
          height={size * 0.72}
          viewBox="0 0 130 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Cute Face Background base */}
          <path
            d="M10 50 C10 20 35 12 65 12 C95 12 120 20 120 50 C120 80 95 90 65 90 C35 90 10 80 10 50 Z"
            fill={skin}
            stroke="#f97316"
            strokeWidth="2.5"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'skin')}
          />

          {/* Cute Eyebrows */}
          <path
            d="M26 26 Q40 18 52 25"
            stroke={eyebrow}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'eyebrow')}
          />
          <path
            d="M78 25 Q90 18 104 26"
            stroke={eyebrow}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'eyebrow')}
          />

          {/* Left Eye (Sparkling Kawaii Brown Eye) */}
          <g>
            {/* Eye Sclera */}
            <ellipse cx="38" cy="48" rx="20" ry="20" fill="#ffffff" stroke="#451a03" strokeWidth="2.5" />
            {/* Brown Iris */}
            <ellipse
              cx="39"
              cy="48"
              rx="15"
              ry="16"
              fill={iris}
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'iris')}
            />
            {/* Pupil */}
            <circle cx="39" cy="49" r="8.5" fill="#291203" />
            {/* Star Sparkle + Highlights */}
            <circle cx="33" cy="42" r="5" fill="#ffffff" />
            <circle cx="45" cy="55" r="2.8" fill="#ffffff" />
            <circle cx="43" cy="40" r="1.8" fill="#fef08a" />
            {/* Cute Eyelashes */}
            <path d="M18 42 Q38 24 58 42" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M48 30 L54 24" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Right Eye (Sparkling Kawaii Brown Eye) */}
          <g>
            <ellipse cx="92" cy="48" rx="20" ry="20" fill="#ffffff" stroke="#451a03" strokeWidth="2.5" />
            <ellipse
              cx="91"
              cy="48"
              rx="15"
              ry="16"
              fill={iris}
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'iris')}
            />
            <circle cx="91" cy="49" r="8.5" fill="#291203" />
            <circle cx="85" cy="42" r="5" fill="#ffffff" />
            <circle cx="97" cy="55" r="2.8" fill="#ffffff" />
            <circle cx="95" cy="40" r="1.8" fill="#fef08a" />
            <path d="M72 42 Q92 24 112 42" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M102 30 L108 24" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Cute Rosy Blushes */}
          <ellipse
            cx="22"
            cy="62"
            rx="9"
            ry="5.5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />
          <ellipse
            cx="108"
            cy="62"
            rx="9"
            ry="5.5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />

          {/* Tiny Cute Smile & Nose */}
          <circle cx="65" cy="54" r="2" fill="#d97706" opacity="0.6" />
          <path d="M60 62 Q65 67 70 62" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    }

    case 2: {
      // 2: blue eyes (반짝반짝 별빛 파란 눈 & 윙크 볼터치)
      const skin = getPartColor('skin', '#fff7ed');
      const iris = getPartColor('iris', '#0284c7');
      const blush = getPartColor('blush', '#fca5a5');
      const eyebrow = getPartColor('eyebrow', '#0284c7');

      return (
        <svg
          width={size}
          height={size * 0.72}
          viewBox="0 0 130 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Face Background */}
          <path
            d="M10 50 C10 20 35 12 65 12 C95 12 120 20 120 50 C120 80 95 90 65 90 C35 90 10 80 10 50 Z"
            fill={skin}
            stroke="#38bdf8"
            strokeWidth="2.5"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'skin')}
          />

          {/* Cute Eyebrows */}
          <path
            d="M26 26 Q40 18 52 25"
            stroke={eyebrow}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'eyebrow')}
          />
          <path
            d="M78 25 Q90 18 104 26"
            stroke={eyebrow}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'eyebrow')}
          />

          {/* Left Eye (Blue Starry Iris) */}
          <g>
            <ellipse cx="38" cy="48" rx="20" ry="20" fill="#ffffff" stroke="#0c4a6e" strokeWidth="2.5" />
            <ellipse
              cx="39"
              cy="48"
              rx="15"
              ry="16"
              fill={iris}
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'iris')}
            />
            <circle cx="39" cy="49" r="8.5" fill="#082f49" />
            <circle cx="33" cy="42" r="5" fill="#ffffff" />
            <circle cx="45" cy="55" r="2.8" fill="#ffffff" />
            <circle cx="43" cy="40" r="2" fill="#7dd3fc" />
            <path d="M18 42 Q38 24 58 42" stroke="#0c4a6e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M48 30 L54 24" stroke="#0c4a6e" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Right Eye (Blue Starry Iris) */}
          <g>
            <ellipse cx="92" cy="48" rx="20" ry="20" fill="#ffffff" stroke="#0c4a6e" strokeWidth="2.5" />
            <ellipse
              cx="91"
              cy="48"
              rx="15"
              ry="16"
              fill={iris}
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'iris')}
            />
            <circle cx="91" cy="49" r="8.5" fill="#082f49" />
            <circle cx="85" cy="42" r="5" fill="#ffffff" />
            <circle cx="97" cy="55" r="2.8" fill="#ffffff" />
            <circle cx="95" cy="40" r="2" fill="#7dd3fc" />
            <path d="M72 42 Q92 24 112 42" stroke="#0c4a6e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M102 30 L108 24" stroke="#0c4a6e" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Rosy Cheek with little heart & blush */}
          <ellipse
            cx="22"
            cy="62"
            rx="9"
            ry="5.5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />
          <ellipse
            cx="108"
            cy="62"
            rx="9"
            ry="5.5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />

          {/* Tiny Smile */}
          <circle cx="65" cy="54" r="2" fill="#0284c7" opacity="0.5" />
          <path d="M60 62 Q65 68 70 62" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    }

    case 3: {
      // 3: long black hair (찰랑찰랑 긴 검은 머리와 예쁜 리본을 단 귀여운 소녀)
      const hair = getPartColor('hair', '#1e293b');
      const ribbon = getPartColor('ribbon', '#f43f5e');
      const skin = getPartColor('skin', '#fff7ed');
      const blush = getPartColor('blush', '#fca5a5');

      return (
        <svg
          width={size}
          height={size * 0.92}
          viewBox="0 0 120 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Back Long Hair */}
          <path
            d="M20 40 C16 10 104 10 100 40 C98 70 106 102 88 106 C72 110 74 88 60 88 C46 88 48 110 32 106 C14 102 22 70 20 40 Z"
            fill={hair}
            stroke="#0f172a"
            strokeWidth="2.5"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'hair')}
          />

          {/* Cute Chibi Face */}
          <circle
            cx="60"
            cy="52"
            r="28"
            fill={skin}
            stroke="#fed7aa"
            strokeWidth="2"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'skin')}
          />

          {/* Rosy Cheeks */}
          <ellipse
            cx="43"
            cy="60"
            rx="5.5"
            ry="3.5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />
          <ellipse
            cx="77"
            cy="60"
            rx="5.5"
            ry="3.5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />

          {/* Cute Eyes & Smile */}
          <ellipse cx="48" cy="50" rx="3.5" ry="4.5" fill="#0f172a" />
          <circle cx="47" cy="48" r="1.5" fill="#ffffff" />
          <ellipse cx="72" cy="50" rx="3.5" ry="4.5" fill="#0f172a" />
          <circle cx="71" cy="48" r="1.5" fill="#ffffff" />
          <path d="M57 60 Q60 63 63 60" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Front Bangs */}
          <path
            d="M32 44 C34 32 45 25 60 25 C75 25 86 32 88 44 C84 44 80 36 72 38 C64 40 62 46 60 46 C58 46 56 40 48 38 C40 36 36 44 32 44 Z"
            fill={hair}
            stroke="#0f172a"
            strokeWidth="2"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'hair')}
          />

          {/* Shiny Sheen Hair Gloss */}
          <path d="M38 33 Q48 29 56 31" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M64 31 Q72 29 82 33" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Cute Red/Pink Ribbon Hairclip on Side */}
          <g className={partStyle} onClick={(e) => handlePartClick(e, 'ribbon')}>
            <circle cx="84" cy="34" r="4" fill={ribbon} stroke="#be123c" strokeWidth="1" />
            <path d="M84 34 L92 28 L91 38 Z" fill={ribbon} stroke="#be123c" strokeWidth="1" />
            <path d="M84 34 L92 40 L93 30 Z" fill={ribbon} stroke="#be123c" strokeWidth="1" />
            <circle cx="84" cy="34" r="2.5" fill="#ffffff" />
          </g>
        </svg>
      );
    }

    case 4: {
      // 4: short brown hair (동글동글 귀여운 숏컷 갈색 머리 캐릭터)
      const hair = getPartColor('hair', '#92400e');
      const skin = getPartColor('skin', '#fff7ed');
      const shirt = getPartColor('shirt', '#38bdf8');
      const blush = getPartColor('blush', '#fca5a5');

      return (
        <svg
          width={size}
          height={size * 0.92}
          viewBox="0 0 120 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Shirt Collar / Shoulder */}
          <path
            d="M38 82 C38 78 50 72 60 72 C70 72 82 78 82 82 L88 104 L32 104 Z"
            fill={shirt}
            stroke="#0284c7"
            strokeWidth="2"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'shirt')}
          />

          {/* Fluffy Back Short Hair */}
          <path
            d="M26 50 C20 22 40 12 60 12 C80 12 100 22 94 50 C94 65 88 72 84 72 C80 72 82 58 82 50 C82 32 75 22 60 22 C45 22 38 32 38 50 C38 58 40 72 36 72 C32 72 26 65 26 50 Z"
            fill={hair}
            stroke="#78350f"
            strokeWidth="2.5"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'hair')}
          />

          {/* Chibi Face */}
          <circle
            cx="60"
            cy="52"
            r="27"
            fill={skin}
            stroke="#fed7aa"
            strokeWidth="2"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'skin')}
          />

          {/* Ears */}
          <circle cx="33" cy="52" r="5.5" fill={skin} stroke="#fed7aa" strokeWidth="1.5" />
          <circle cx="87" cy="52" r="5.5" fill={skin} stroke="#fed7aa" strokeWidth="1.5" />

          {/* Cute Rosy Blushes */}
          <ellipse
            cx="44"
            cy="58"
            rx="5.5"
            ry="3.5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />
          <ellipse
            cx="76"
            cy="58"
            rx="5.5"
            ry="3.5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />

          {/* Sparkly Happy Eyes */}
          <ellipse cx="48" cy="48" rx="3.5" ry="4.5" fill="#451a03" />
          <circle cx="47" cy="46" r="1.5" fill="#ffffff" />
          <ellipse cx="72" cy="48" rx="3.5" ry="4.5" fill="#451a03" />
          <circle cx="71" cy="46" r="1.5" fill="#ffffff" />

          {/* Cute Big Smile */}
          <path d="M55 58 Q60 65 65 58" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Cute Fluffy Front Bangs with spikes */}
          <path
            d="M32 40 C35 26 48 20 60 20 C72 20 85 26 88 40 C82 36 78 30 72 35 C66 40 64 30 58 35 C52 40 50 30 44 35 C38 40 34 36 32 40 Z"
            fill={hair}
            stroke="#78350f"
            strokeWidth="2"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'hair')}
          />

          {/* Glossy Sheen */}
          <path d="M42 26 Q52 22 64 24" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    }

    case 5: {
      // 5: red glasses (귀여운 빨간 뿔테 안경을 쓴 치비 캐릭터)
      const frames = getPartColor('frames', '#ef4444');
      const lens = getPartColor('lens', '#e0f2fe');
      const skin = getPartColor('skin', '#fff7ed');
      const blush = getPartColor('blush', '#fca5a5');

      return (
        <svg
          width={size}
          height={size * 0.72}
          viewBox="0 0 130 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Face Base */}
          <path
            d="M15 48 C15 22 35 14 65 14 C95 14 115 22 115 48 C115 76 95 86 65 86 C35 86 15 76 15 48 Z"
            fill={skin}
            stroke="#fed7aa"
            strokeWidth="2"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'skin')}
          />

          {/* Blushes */}
          <ellipse
            cx="25"
            cy="62"
            rx="8"
            ry="5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />
          <ellipse
            cx="105"
            cy="62"
            rx="8"
            ry="5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />

          {/* Cute Eyes behind glasses */}
          <ellipse cx="40" cy="46" rx="4" ry="5.5" fill="#0f172a" />
          <circle cx="39" cy="44" r="1.8" fill="#ffffff" />
          <ellipse cx="90" cy="46" rx="4" ry="5.5" fill="#0f172a" />
          <circle cx="89" cy="44" r="1.8" fill="#ffffff" />

          {/* Smile */}
          <path d="M60 62 Q65 67 70 62" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* RED GLASSES (Round & Cute) */}
          {/* Temples */}
          <path d="M12 40 L20 44" stroke={frames} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M118 40 L110 44" stroke={frames} strokeWidth="4.5" strokeLinecap="round" />

          {/* Left Frame & Lens */}
          <circle
            cx="40"
            cy="46"
            r="19"
            fill={lens}
            fillOpacity="0.45"
            stroke={frames}
            strokeWidth="5"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'frames')}
          />
          {/* Glass Reflection highlight */}
          <path d="M28 38 L36 54" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

          {/* Center Bridge */}
          <path
            d="M59 44 Q65 39 71 44"
            stroke={frames}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'frames')}
          />

          {/* Right Frame & Lens */}
          <circle
            cx="90"
            cy="46"
            r="19"
            fill={lens}
            fillOpacity="0.45"
            stroke={frames}
            strokeWidth="5"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'frames')}
          />
          <path d="M78 38 L86 54" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    }

    case 6: {
      // 6: black glasses (스마트하고 깜찍한 검정 뿔테 안경 치비 캐릭터)
      const frames = getPartColor('frames', '#1e293b');
      const lens = getPartColor('lens', '#f1f5f9');
      const skin = getPartColor('skin', '#fff7ed');
      const blush = getPartColor('blush', '#fca5a5');

      return (
        <svg
          width={size}
          height={size * 0.72}
          viewBox="0 0 130 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Face Base */}
          <path
            d="M15 48 C15 22 35 14 65 14 C95 14 115 22 115 48 C115 76 95 86 65 86 C35 86 15 76 15 48 Z"
            fill={skin}
            stroke="#fed7aa"
            strokeWidth="2"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'skin')}
          />

          {/* Blushes */}
          <ellipse
            cx="25"
            cy="62"
            rx="8"
            ry="5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />
          <ellipse
            cx="105"
            cy="62"
            rx="8"
            ry="5"
            fill={blush}
            opacity="0.8"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'blush')}
          />

          {/* Cute Starry Eyes behind glasses */}
          <ellipse cx="40" cy="46" rx="4" ry="5.5" fill="#0f172a" />
          <circle cx="39" cy="44" r="1.8" fill="#ffffff" />
          <ellipse cx="90" cy="46" rx="4" ry="5.5" fill="#0f172a" />
          <circle cx="89" cy="44" r="1.8" fill="#ffffff" />

          {/* Cute Smile */}
          <path d="M60 62 Q65 67 70 62" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* BLACK GLASSES (Smart Round Style) */}
          <path d="M12 40 L20 44" stroke={frames} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M118 40 L110 44" stroke={frames} strokeWidth="4.5" strokeLinecap="round" />

          {/* Left Frame & Lens */}
          <circle
            cx="40"
            cy="46"
            r="19"
            fill={lens}
            fillOpacity="0.4"
            stroke={frames}
            strokeWidth="5"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'frames')}
          />
          <path d="M28 38 L36 54" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

          {/* Center Bridge */}
          <path
            d="M59 44 Q65 39 71 44"
            stroke={frames}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'frames')}
          />

          {/* Right Frame & Lens */}
          <circle
            cx="90"
            cy="46"
            r="19"
            fill={lens}
            fillOpacity="0.4"
            stroke={frames}
            strokeWidth="5"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'frames')}
          />
          <path d="M78 38 L86 54" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    }

    case 7: {
      // 7: a yellow dress (사랑스러운 노란 프릴 원피스 드레스 & 빨간 리본)
      const dress = getPartColor('dress', '#facc15');
      const bow = getPartColor('bow', '#f43f5e');
      const frills = getPartColor('frills', '#fef08a');
      const hanger = getPartColor('hanger', '#fb923c');

      return (
        <svg
          width={size}
          height={size * 0.95}
          viewBox="0 0 110 105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Cute Wooden/Gold Hanger at top */}
          <path
            d="M55 8 C55 3 48 3 48 8 C48 14 55 16 55 20 M28 28 L55 20 L82 28"
            stroke={hanger}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Main Dress Body */}
          <path
            d="M36 26 C36 26 22 34 24 44 C26 50 36 46 38 40 L38 48 C38 48 24 88 18 92 C32 98 48 95 55 95 C62 95 78 98 92 92 C86 88 72 48 72 48 L72 40 C74 46 84 50 86 44 C88 34 74 26 74 26 C70 30 64 32 55 32 C46 32 40 30 36 26 Z"
            fill={dress}
            stroke="#ca8a04"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'dress')}
          />

          {/* Neckline Lace Frill */}
          <path
            d="M38 27 Q55 35 72 27"
            stroke="#ca8a04"
            strokeWidth="2"
            fill={frills}
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'frills')}
          />

          {/* Bottom Hem Frills Wave */}
          <path
            d="M18 92 Q28 86 36 92 Q46 86 55 92 Q64 86 74 92 Q82 86 92 92"
            stroke="#ca8a04"
            strokeWidth="2"
            fill={frills}
            className={partStyle}
            onClick={(e) => handlePartClick(e, 'frills')}
          />

          {/* Dress Waist Ribbon Band */}
          <path d="M38 48 Q55 52 72 48" stroke="#ca8a04" strokeWidth="2" fill="none" />

          {/* Cute Big Bow on Chest */}
          <g className={partStyle} onClick={(e) => handlePartClick(e, 'bow')}>
            <circle cx="55" cy="38" r="4.5" fill={bow} stroke="#be123c" strokeWidth="1.5" />
            <path d="M55 38 L42 32 L44 44 Z" fill={bow} stroke="#be123c" strokeWidth="1.5" />
            <path d="M55 38 L68 32 L66 44 Z" fill={bow} stroke="#be123c" strokeWidth="1.5" />
            <circle cx="55" cy="38" r="2.5" fill="#ffffff" />
          </g>

          {/* Cute Little Heart / Stars on Skirt */}
          <circle cx="42" cy="68" r="3" fill="#ffffff" opacity="0.85" />
          <circle cx="68" cy="68" r="3" fill="#ffffff" opacity="0.85" />
          <circle cx="55" cy="78" r="3.5" fill="#ffffff" opacity="0.85" />
        </svg>
      );
    }

    case 8: {
      // 8: a white shirt and green pants (귀여운 흰색 카라 셔츠 & 상큼한 초록 멜빵바지)
      const shirt = getPartColor('shirt', '#ffffff');
      const collar = getPartColor('collar', '#e2e8f0');
      const bowtie = getPartColor('bowtie', '#ef4444');
      const pants = getPartColor('pants', '#22c55e');
      const belt = getPartColor('belt', '#15803d');

      return (
        <svg
          width={size}
          height={size * 0.98}
          viewBox="0 0 110 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* WHITE SHIRT (Top) */}
          <g>
            <path
              d="M34 16 L44 20 L66 20 L76 16 L90 32 L78 40 L72 32 L72 52 L38 52 L38 32 L32 40 L20 32 Z"
              fill={shirt}
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'shirt')}
            />

            {/* Cute Shirt Collar */}
            <path
              d="M44 20 L55 30 L48 34 L44 20"
              fill={collar}
              stroke="#94a3b8"
              strokeWidth="1.5"
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'collar')}
            />
            <path
              d="M66 20 L55 30 L62 34 L66 20"
              fill={collar}
              stroke="#94a3b8"
              strokeWidth="1.5"
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'collar')}
            />

            {/* Cute Red Bowtie */}
            <g className={partStyle} onClick={(e) => handlePartClick(e, 'bowtie')}>
              <circle cx="55" cy="27" r="3.5" fill={bowtie} stroke="#b91c1c" strokeWidth="1" />
              <path d="M55 27 L46 22 L48 32 Z" fill={bowtie} stroke="#b91c1c" strokeWidth="1" />
              <path d="M55 27 L64 22 L62 32 Z" fill={bowtie} stroke="#b91c1c" strokeWidth="1" />
            </g>

            {/* Little Pocket */}
            <rect x="62" y="36" width="6" height="7" rx="1.5" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>

          {/* GREEN PANTS (Bottom) */}
          <g>
            <path
              d="M38 52 L72 52 L75 96 L59 96 L55 68 L51 96 L35 96 Z"
              fill={pants}
              stroke="#15803d"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'pants')}
            />

            {/* Belt / Waistband */}
            <line
              x1="38"
              y1="56"
              x2="72"
              y2="56"
              stroke={belt}
              strokeWidth="3"
              className={partStyle}
              onClick={(e) => handlePartClick(e, 'belt')}
            />

            {/* Cute Pockets on pants */}
            <path d="M42 60 L48 68" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
            <path d="M68 60 L62 68" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );
    }

    default:
      return null;
  }
};
