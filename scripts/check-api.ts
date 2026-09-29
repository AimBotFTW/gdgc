import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[CHECK-API] Testing Gemini connection with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n--- [SUCCESS: API CONNECTED] ---");
    console.log(`Issues detected: ${result.issues.length}`);
    console.log(`Roast:\n${result.roast}`);
    console.log(`\nTakeaway:\n${result.takeaway}`);
    console.log("\n--------------------------------");
  } catch (error) {
    console.error("\n--- [FAILURE: API CHECK FAILED] ---");
    console.error(error instanceof Error ? error.message : String(error));
    console.error("-----------------------------------");
    process.exit(1);
  }
}

main();
