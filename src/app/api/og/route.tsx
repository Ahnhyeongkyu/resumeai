import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "ResumeAI";
  const description = searchParams.get("description") || "AI Resume Builder";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#3b82f6",
              letterSpacing: "-0.02em",
            }}
          >
            ResumeAI
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              maxWidth: "900px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
