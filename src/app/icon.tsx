import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

// E-1 Merge Node 아이콘 — 파비콘 자동 생성
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D1217',
          width: '100%',
          height: '100%',
          borderRadius: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="320" height="360" viewBox="0 0 320 360">
          {/* 연결선 */}
          <line
            x1="85" y1="75" x2="160" y2="255"
            stroke="rgba(59,130,246,0.4)" strokeWidth="14" strokeLinecap="round"
          />
          <line
            x1="235" y1="75" x2="160" y2="255"
            stroke="rgba(59,130,246,0.4)" strokeWidth="14" strokeLinecap="round"
          />
          {/* 브랜치 노드 (파랑) */}
          <circle cx="85"  cy="75"  r="50" fill="#3B82F6" />
          <circle cx="235" cy="75"  r="50" fill="#3B82F6" />
          {/* 머지 노드 (초록) */}
          <circle cx="160" cy="295" r="62" fill="#4ADA8C" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
