import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const defaultMsg = error instanceof Error ? error.message : "Failed to analyze code with Gemini.";

  switch (status) {
    case 400:
      return "Invalid request format or input rejected by Gemini API. Check your code syntax.";
    case 401:
    case 403:
      return "Invalid or unauthorized GEMINI_API_KEY. Verify your API key in .env.local.";
    case 404:
      return `Model "${AI.model}" not found. Verify AI.model in config/app.config.ts.`;
    case 429:
      return "Gemini API rate limit exceeded. Please wait a few seconds and retry.";
    case 503:
      return "Gemini service is temporarily overloaded (503). All retry attempts exhausted.";
    default:
      return defaultMsg;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  let attempt = 0;
  while (attempt < AI.maxAttempts) {
    attempt++;
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const text = response.text;
      if (!text || !text.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        throw new Error(
          `Failed to parse response JSON from Gemini: ${err instanceof Error ? err.message : String(err)}`
        );
      }

      return {
        roast: typeof parsed.roast === "string" ? parsed.roast : "",
        issues: Array.isArray(parsed.issues)
          ? parsed.issues.filter(
              (issue): issue is RoastResult["issues"][number] =>
                !!issue &&
                typeof issue === "object" &&
                typeof (issue as RoastResult["issues"][number]).line === "number" &&
                typeof (issue as RoastResult["issues"][number]).severity === "string" &&
                typeof (issue as RoastResult["issues"][number]).title === "string"
            )
          : [],
        correctedCode:
          typeof parsed.correctedCode === "string" ? parsed.correctedCode : "",
        takeaway: typeof parsed.takeaway === "string" ? parsed.takeaway : "",
      };
    } catch (error: unknown) {
      const status =
        (error as { status?: number })?.status ||
        (error as { statusCode?: number })?.statusCode ||
        (error as { response?: { status?: number } })?.response?.status;

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, error));
    }
  }

  throw new Error("Maximum retry attempts reached without response.");
}
