import { NextRequest, NextResponse } from "next/server";
import { calculateATSScore, type GeneratedResume } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const body: { resume: GeneratedResume; jobDescription: string } = await request.json();

    if (!body.resume || !body.jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required" },
        { status: 400 }
      );
    }

    const score = await calculateATSScore(body.resume, body.jobDescription);
    return NextResponse.json(score);
  } catch (error) {
    console.error("ATS score error:", error);
    return NextResponse.json(
      { error: "Failed to calculate ATS score" },
      { status: 500 }
    );
  }
}
