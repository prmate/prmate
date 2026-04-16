import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D1217',
          padding: '0 100px',
          gap: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 아이콘 */}
        <div
          style={{
            width: 230,
            height: 230,
            background: '#161D2C',
            borderRadius: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(59,130,246,0.3)',
            flexShrink: 0,
          }}
        >
          <svg width="160" height="180" viewBox="0 0 320 360">
            <line
              x1="85" y1="75" x2="160" y2="255"
              stroke="rgba(59,130,246,0.4)" strokeWidth="14" strokeLinecap="round"
            />
            <line
              x1="235" y1="75" x2="160" y2="255"
              stroke="rgba(59,130,246,0.4)" strokeWidth="14" strokeLinecap="round"
            />
            <circle cx="85"  cy="75"  r="50" fill="#3B82F6" />
            <circle cx="235" cy="75"  r="50" fill="#3B82F6" />
            <circle cx="160" cy="295" r="62" fill="#4ADA8C" />
          </svg>
        </div>

        {/* 텍스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: '#F3F4F6', lineHeight: 1 }}>
            PRmate
          </div>
          <div style={{ fontSize: 36, color: '#9CA3AF', lineHeight: 1.4 }}>
            한국어 AI 코드 리뷰
          </div>
          <div style={{ fontSize: 26, color: '#3B82F6' }}>
            우아한테크코스 · 네이버 Hackday · 토스 Frontend
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '8px',
            }}
          >
            <div
              style={{
                background: 'rgba(59,130,246,0.15)',
                border: '1px solid rgba(59,130,246,0.4)',
                color: '#93C5FD',
                padding: '6px 18px',
                borderRadius: 999,
                fontSize: '22px',
              }}
            >
              🚀 베타 무료
            </div>
            <div
              style={{
                background: 'rgba(74,218,140,0.12)',
                border: '1px solid rgba(74,218,140,0.35)',
                color: '#6EE7B7',
                padding: '6px 18px',
                borderRadius: 999,
                fontSize: '22px',
              }}
            >
              ✓ 공식 자료 기반
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
