import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const score = parseInt(searchParams.get("score") || "0");
  const job = searchParams.get("job") || "Your Role";

  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#ef4444";

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
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <div style={{ fontSize: 28, color: "#3b82f6", fontWeight: 700 }}>ResumeAI — ATS Score</div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: color,
              lineHeight: 1,
            }}
          >
            {score}
          </div>
          <div style={{ fontSize: 32, color: "#94a3b8" }}>out of 100</div>
          <div style={{ fontSize: 24, color: "#64748b", marginTop: "8px" }}>
            for {job}
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#3b82f6",
              marginTop: "24px",
              padding: "12px 32px",
              border: "2px solid #3b82f6",
              borderRadius: "999px",
            }}
          >
            Check your score at resumeai.site
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
