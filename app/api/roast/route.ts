import { NextRequest, NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload in request." },
      { status: 400 }
    );
  }

  const payload = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;

  const code = typeof payload.code === "string" ? payload.code : "";
  const errorMessage = typeof payload.errorMessage === "string" ? payload.errorMessage.trim() : "";

  if (!code.trim()) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed limit of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum limit of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  const validLanguages = LANGUAGES.map((l) => l.id as string);
  const language: LanguageId =
    typeof payload.language === "string" && validLanguages.includes(payload.language)
      ? (payload.language as LanguageId)
      : DEFAULTS.language;

  const validRoastLevels = ROAST_LEVELS.map((r) => r.id as string);
  const roastLevel: RoastLevel =
    typeof payload.roastLevel === "string" && validRoastLevels.includes(payload.roastLevel)
      ? (payload.roastLevel as RoastLevel)
      : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage || undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API /api/roast error]:", error);
    const message = error instanceof Error ? error.message : "Failed to analyze code.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
