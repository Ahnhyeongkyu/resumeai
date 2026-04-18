import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const score = parseInt(searchParams.get('score') || '0', 10);
  const name = searchParams.get('name') || '';

  const clampedScore = Math.min(100, Math.max(0, score));

  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (clampedScore / 100) * circumference;

  let scoreColor = '#10b981'; // emerald-500
  if (clampedScore < 50) {
    scoreColor = '#ef4444'; // red
  } else if (clampedScore < 75) {
    scoreColor = '#f59e0b'; // amber
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030712',
          fontFamily: 'sans-serif',
        }}
      >
        {name && (
          <div
            style={{
              fontSize: 32,
              color: '#9ca3af',
              marginBottom: 16,
              display: 'flex',
            }}
          >
            {name}&apos;s Resume
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: 240,
            height: 240,
          }}
        >
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#1f2937"
              strokeWidth="12"
            />
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke={scoreColor}
              strokeWidth="12"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${offset}`}
              strokeLinecap="round"
              transform="rotate(-90 120 120)"
            />
          </svg>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1,
                display: 'flex',
              }}
            >
              {clampedScore}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#10b981',
            marginTop: 20,
            display: 'flex',
          }}
        >
          ATS Score
        </div>

        <div
          style={{
            fontSize: 20,
            color: '#6b7280',
            marginTop: 'auto',
            marginBottom: 40,
            display: 'flex',
          }}
        >
          Check your resume score at resumeai.site
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
