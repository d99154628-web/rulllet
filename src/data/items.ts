import { WheelItem } from '../types';

export const WHEEL_ITEMS: WheelItem[] = [
  {
    id: 1,
    number: 1,
    label: '갈색 눈',
    phrase: 'brown eyes',
    blanks: {
      prefix: 'brown',
      blank: 'eyes',
      suffix: '',
    },
    highlightColor: '#8d4b1a',
    description: '초롱초롱 반짝이는 두 갈색 눈',
    targetColors: [
      { part: 'iris', colorName: '갈색 (Brown)', expectedHexes: ['#8d4b1a', '#92400e', '#78350f', '#b45309'] },
    ],
  },
  {
    id: 2,
    number: 2,
    label: '파란 눈',
    phrase: 'blue eyes',
    blanks: {
      prefix: '',
      blank: 'blue',
      suffix: 'eyes',
    },
    highlightColor: '#0284c7',
    description: '별빛처럼 맑고 푸른 두 파란 눈',
    targetColors: [
      { part: 'iris', colorName: '파란색 (Blue)', expectedHexes: ['#0284c7', '#0ea5e9', '#38bdf8', '#2563eb', '#3b82f6'] },
    ],
  },
  {
    id: 3,
    number: 3,
    label: '긴 검정 머리',
    phrase: 'long black hair',
    blanks: {
      prefix: 'long',
      blank: 'black',
      suffix: 'hair',
    },
    highlightColor: '#1e293b',
    description: '찰랑찰랑 단정한 긴 검은색 머리',
    targetColors: [
      { part: 'hair', colorName: '검은색 (Black)', expectedHexes: ['#1e293b', '#0f172a', '#334155', '#475569'] },
    ],
  },
  {
    id: 4,
    number: 4,
    label: '짧은 갈색 머리',
    phrase: 'short brown hair',
    blanks: {
      prefix: 'short brown',
      blank: 'hair',
      suffix: '',
    },
    highlightColor: '#92400e',
    description: '산뜻하고 귀여운 짧은 갈색 머리',
    targetColors: [
      { part: 'hair', colorName: '갈색 (Brown)', expectedHexes: ['#92400e', '#8d4b1a', '#78350f', '#b45309', '#d97706'] },
    ],
  },
  {
    id: 5,
    number: 5,
    label: '빨간 안경',
    phrase: 'red glasses',
    blanks: {
      prefix: 'red',
      blank: 'glasses',
      suffix: '',
    },
    highlightColor: '#ef4444',
    description: '동글동글 깜찍한 빨간 뿔테 안경',
    targetColors: [
      { part: 'frames', colorName: '빨간색 (Red)', expectedHexes: ['#ef4444', '#dc2626', '#b91c1c', '#f87171'] },
    ],
  },
  {
    id: 6,
    number: 6,
    label: '검정 안경',
    phrase: 'black glasses',
    blanks: {
      prefix: 'black',
      blank: 'glasses',
      suffix: '',
    },
    highlightColor: '#1e293b',
    description: '스마트하고 단정한 검정 뿔테 안경',
    targetColors: [
      { part: 'frames', colorName: '검은색 (Black)', expectedHexes: ['#1e293b', '#0f172a', '#334155', '#475569'] },
    ],
  },
  {
    id: 7,
    number: 7,
    label: '노란 원피스 드레스',
    phrase: 'a yellow dress',
    blanks: {
      prefix: 'a yellow',
      blank: 'dress',
      suffix: '',
    },
    highlightColor: '#facc15',
    description: '프릴과 리본이 달린 화사한 노란 원피스',
    targetColors: [
      { part: 'dress', colorName: '노란색 (Yellow)', expectedHexes: ['#facc15', '#eab308', '#fde047', '#fbbf24'] },
    ],
  },
  {
    id: 8,
    number: 8,
    label: '흰 셔츠와 초록 바지',
    phrase: 'a white shirt and green pants',
    blanks: {
      prefix: 'a white',
      blank: 'shirt',
      suffix: 'and',
      secondPrefix: '',
      secondBlank: 'green',
      secondSuffix: 'pants',
    },
    highlightColor: '#22c55e',
    description: '하얀 카라 셔츠와 상큼한 초록 바지',
    targetColors: [
      { part: 'shirt', colorName: '흰색 (White)', expectedHexes: ['#ffffff', '#f8fafc', '#f1f5f9'] },
      { part: 'pants', colorName: '초록색 (Green)', expectedHexes: ['#22c55e', '#16a34a', '#15803d', '#4ade80'] },
    ],
  },
];
