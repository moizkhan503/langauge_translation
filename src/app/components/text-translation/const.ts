const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY

const TRANSLATION_SYSTEM_PROMPT = `You are a professional translator. Translate the given text from {sourceLanguage} to {targetLanguage}. 

Rules:
- Provide only the translation, no explanations
- Maintain the original formatting and structure
- Preserve proper nouns when appropriate
- Use natural, fluent language in the target language
- If the source language is 'auto', detect the language first then translate
- For technical terms, use the most appropriate equivalent in the target language`

export const translateText = async (text: string, targetLanguage: string, sourceLanguage: string): Promise<string> => {
  try {
    const formattedPrompt = TRANSLATION_SYSTEM_PROMPT
      .replace('{sourceLanguage}', sourceLanguage === "auto" ? "the detected language" : sourceLanguage)
      .replace('{targetLanguage}', targetLanguage)

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: formattedPrompt,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content?.trim() || ""
  } catch (error) {
    console.error("Translation error:", error)
    throw new Error("Failed to translate text. Please try again.")
  }
}
