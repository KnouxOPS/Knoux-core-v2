import { useState } from "react";
import { enhanceCode, analyzeCode, CodeEditResponse } from "@/lib/ai-service";

export function useCodeEditor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CodeEditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processCode = async (code: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const enhancedResult = await enhanceCode(code);
      setResult(enhancedResult);
      return enhancedResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    result,
    error,
    processCode,
    resetError: () => setError(null),
    resetResult: () => setResult(null)
  };
}
