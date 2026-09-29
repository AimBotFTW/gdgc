import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "The main witty/humorous critique in Hinglish.",
    },
    issues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue appears.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short title of the flaw in Hinglish.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code from the submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Technical diagnosis and explanation in Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "Expected fix or pattern in Hinglish.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete fixed source code without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Short engineering takeaway or moral in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
