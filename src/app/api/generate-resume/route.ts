import { NextRequest, NextResponse } from "next/server";
import { generateResume, type ResumeInput } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const body: ResumeInput = await request.json();

    if (!body.jobDescription || !body.fullName) {
      return NextResponse.json(
        { error: "Job description and name are required" },
        { status: 400 }
      );
    }

    const resume = await generateResume(body);
    return NextResponse.json(resume);
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate resume" },
      { status: 500 }
    );
  }
}
