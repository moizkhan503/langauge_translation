"use client"

import { useState } from "react"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Download, Copy, RotateCcw, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { translateText } from "./const"

type TranslationHistory = {
  id: string
  originalText: string
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
  timestamp: Date
}

export default function TextTranslationPage() {
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationHistory, setTranslationHistory] = useState<TranslationHistory[]>([])
  const [copySuccess, setCopySuccess] = useState(false)
  const [error, setError] = useState("")

  // Language options for the dropdown
  const languages = [
    { code: "auto", name: "Auto-detect" },
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "tr", name: "Turkish" },
  ]

  const handleSwapLanguages = () => {
    if (sourceLanguage !== "auto") {
      const temp = sourceLanguage
      setSourceLanguage(targetLanguage)
      setTargetLanguage(temp)
      setInputText(translatedText)
      setTranslatedText(inputText)
    }
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter text to translate")
      return
    }

    setIsTranslating(true)
    setError("")

    try {
      const result = await translateText(inputText, targetLanguage, sourceLanguage)
      setTranslatedText(result)

      // Add to history
      const newTranslation: TranslationHistory = {
        id: Date.now().toString(),
        originalText: inputText,
        translatedText: result,
        sourceLanguage,
        targetLanguage,
        timestamp: new Date(),
      }
      setTranslationHistory((prev) => [newTranslation, ...prev.slice(0, 9)]) // Keep last 10
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed")
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      setError("Failed to copy text")
    }
  }

  const handleDownload = () => {
    const blob = new Blob([translatedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `translation_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputText("")
    setTranslatedText("")
    setError("")
  }

  const getLanguageName = (code: string) => {
    return languages.find((lang) => lang.code === code)?.name || code
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Text Translation</h1>
            <p className="text-base sm:text-xl text-gray-700">Translate text instantly with AI-powered accuracy</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Language Selection */}
          <div className="mb-6 sm:mb-8 rounded-xl bg-white shadow-lg border border-gray-200 p-4 sm:p-6">
            <h2 className="text-center text-gray-900 text-lg sm:text-xl font-semibold mb-4">Translation Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Source Language</label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 font-medium bg-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSwapLanguages}
                  disabled={sourceLanguage === "auto"}
                  className="p-3 rounded-full border-2 border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
                >
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Target Language</label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 font-medium bg-white"
                >
                  {languages
                    .filter((lang) => lang.code !== "auto")
                    .map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Text Translation Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Input */}
            <div className="rounded-xl bg-white shadow-lg border border-gray-200">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 rounded-t-xl">
                <h3 className="text-base sm:text-lg font-bold text-white">Original Text</h3>
                <p className="text-sm text-blue-100">Type or paste your text here</p>
              </div>
              <div className="p-4 sm:p-6">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="w-full min-h-[250px] sm:min-h-[300px] resize-none border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base text-gray-900 font-medium placeholder-gray-500 bg-gray-50"
                  maxLength={5000}
                />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
                  <span className="text-sm text-gray-700 font-medium">{inputText.length} / 5000 characters</span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={clearAll}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleTranslate}
                      disabled={isTranslating || !inputText.trim()}
                      className="flex-1 sm:flex-none px-6 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                    >
                      {isTranslating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Translating...
                        </>
                      ) : (
                        "Translate"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="rounded-xl bg-white shadow-lg border border-gray-200">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-t-xl">
                <h3 className="text-base sm:text-lg font-bold text-white">Translated Text</h3>
                <p className="text-sm text-green-100">Your translation will appear here</p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="min-h-[250px] sm:min-h-[300px] p-4 bg-gray-50 rounded-lg border border-gray-300">
                  {translatedText ? (
                    <p className="text-gray-900 whitespace-pre-wrap text-sm sm:text-base font-medium leading-relaxed">
                      {translatedText}
                    </p>
                  ) : (
                    <p className="text-gray-600 italic text-sm sm:text-base">Translation will appear here...</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
                  <span className="text-sm text-gray-700 font-medium">
                    {translatedText ? "Translation ready" : "Waiting for translation"}
                  </span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopy}
                      disabled={!translatedText}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium border-2 border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {copySuccess ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      {copySuccess ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={handleDownload}
                      disabled={!translatedText}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium border-2 border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Download className="h-4 w-4" /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Translations */}
          {translationHistory.length > 0 && (
            <div className="mt-6 sm:mt-8 rounded-xl bg-white shadow-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Recent Translations</h3>
              <p className="text-sm text-gray-700 mb-4">Your translation history</p>
              <div className="space-y-4">
                {translationHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">Translation {item.id.slice(-4)}</p>
                      <p className="text-sm text-gray-700 font-medium">
                        {getLanguageName(item.sourceLanguage)} → {getLanguageName(item.targetLanguage)} •{" "}
                        {item.timestamp.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-800 mt-1 line-clamp-2 font-medium">
                        {item.originalText.substring(0, 100)}...
                      </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setInputText(item.originalText)
                          setTranslatedText(item.translatedText)
                          setSourceLanguage(item.sourceLanguage)
                          setTargetLanguage(item.targetLanguage)
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          const blob = new Blob([item.translatedText], { type: "text/plain" })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = `translation_${item.id}.txt`
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                        className="p-2 text-sm border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
