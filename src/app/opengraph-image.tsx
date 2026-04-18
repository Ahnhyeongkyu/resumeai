import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ResumeAI — AI Resume Builder. ATS-Optimized in 30 Seconds.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0a0a',
          padding: '80px',
          color: '#fff',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 32,
            fontWeight: 700,
            color: '#10b981',
          }}
        >
          ResumeAI
        </div>
        <div
          style={{
            marginTop: 80,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Your Resume Gets</span>
          <span>6 Seconds.</span>
          <span style={{ color: '#10b981' }}>Make Them Count.</span>
        </div>
        <div
          style={{
            marginTop: 50,
            fontSize: 32,
            color: '#a3a3a3',
            display: 'flex',
          }}
        >
          AI builds ATS-optimized resumes. $9 once. No subscription.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: '#737373',
          }}
        >
          <span>getresumeai.site</span>
          <span>Made with ResumeAI</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
